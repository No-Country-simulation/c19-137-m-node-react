// src/modules/users/users.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { PasswordResetTokenEntity } from './entities/password-reset-token.entity';
import { PubSub } from 'graphql-subscriptions';
import { addFavoriteBookInput } from './dto/add-favorite-book.input';
import { BookEntity } from '../books/entities/book.entity';

const pubSub = new PubSub();

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PasswordResetTokenEntity)
    private readonly passwordResetTokenRepository: Repository<PasswordResetTokenEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) { }

  /**
   * Helper para hashear la contraseña
   * @param password
   */
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // You can adjust the number of salt rounds
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Crear un usuario
   * @param createUserInput
   */
  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    this.logger.log(`createUserInput: ${JSON.stringify(createUserInput)}`);

    if (!createUserInput.password) {
      throw new InternalServerErrorException('Password is required');
    }
    const hashedPassword = await this.hashPassword(createUserInput.password);
    const userValidated = this.userRepository.create({
      nickname: createUserInput.nickName,
      email: createUserInput.email,
      first_name: createUserInput.firstName,
      last_name: createUserInput.lastName,
      password: hashedPassword,
    });
    return await this.userRepository.save(userValidated);
  }

  /**
   * Buscar todos los usuarios
   */

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find({
      relations: [
        'posts',
        'posts.comments',
        'favorites',
        'favorites.author',
        'favorites.reviews',
        'reviews',
        'reviews.book',
        'comments',
        'comments.post',
      ],
    });
    console.log('users', users);
    return users;
  }

  /**
   * Actualizar un usuario
   * @param updateUserInput
   */
  async update(updateUserInput: UpdateUserInput): Promise<UserEntity> {
    await this.userRepository.update(updateUserInput.id, updateUserInput);
    return this.userRepository.findOne({
      where: { id: updateUserInput.id },
    });
  }

  /**
   * Eliminar un usuario
   * @param id
   */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  /**
   * Busca un usuario por email
   * @param email
   * @returns el usuario
   */
  // async findByEmail(email: string) {
  //   return this.userRepository.findOne({
  //     where: { email },
  //     relations: [
  //       'posts',
  //       'posts.comments',
  //       'favorites',
  //       'favorites.author',
  //       'favorites.reviews',
  //       'reviews',
  //       'reviews.book',
  //       'comments',
  //       'comments.post',
  //     ],
  //   });
  // }

  /**
   * Busca un usuario por ID
   * @param id
   * @returns el usuario
   */
  async findById(id: string): Promise<UserEntity> {
    try {
      const post = await this.userRepository.findOne({
        where: { id: id },
        relations: [
          'posts',
          'posts.comments',
          'favorites',
          'favorites.author',
          'favorites.reviews',
          'reviews',
          'reviews.book',
          'comments',
          'comments.post',
        ],
      });
      console.log('post', post);
      return post;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crear un token de restablecimiento de contraseña
   * @param user
   * @param token
   * @param expiresAt
   */
  async createPasswordResetToken(
    user: UserEntity,
    token: string,
    expiresAt: Date,
  ) {
    //eliminar cualquier token existente
    const existingTokens = await this.passwordResetTokenRepository.find({
      where: { user_id: user.id },
    });

    //delete all existing tokens
    await this.passwordResetTokenRepository.remove(existingTokens);

    //crear un nuevo token
    const passwordResetToken = this.passwordResetTokenRepository.create({
      token,
      user_id: user.id,
      expires_at: expiresAt,
      created_at: new Date(),
    });

    return this.passwordResetTokenRepository.save(passwordResetToken);
  }

  /**
   * Buscar un token de restablecimiento de contraseña
   * @param token
   */
  async findToken(token: string) {
    return this.passwordResetTokenRepository.findOne({ where: { token } });
  }

  /**
   * Eliminar un token de restablecimiento de contraseña
   * @param id
   */
  async deleteToken(id: string) {
    return this.passwordResetTokenRepository.delete(id);
  }

  /**
   * Buscar un token de restablecimiento de contraseña por usuario
   * @param user_id
   */
  async findTokenByUser(user_id: string) {
    return this.passwordResetTokenRepository.findOne({ where: { user_id } });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByNickname(nickName: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { nickname: nickName } });
  }

  // async findByNickname(nickname: string) {
  //   return this.userRepository.find({
  //     where: { nickname: ILike(`%${nickname}%`) },
  //     relations: [
  //       'posts',
  //       'posts.comments',
  //       'favorites',
  //       'favorites.author',
  //       'favorites.reviews',
  //       'reviews',
  //       'reviews.book',
  //       'comments',
  //       'comments.post',
  //     ],
  //   });
  // }

  async findByRole(role: string) {
    return this.userRepository.find({
      where: { role },
      relations: [
        'posts',
        'posts.comments',
        'favorites',
        'favorites.author',
        'favorites.reviews',
        'reviews',
        'reviews.book',
        'comments',
        'comments.post',
      ],
    });
  }

  async findByName(name: string) {
    return this.userRepository.find({
      where: [
        { first_name: ILike(`%${name}%`) }, // Search in first_name
        { last_name: ILike(`%${name}%`) }, // Search in last_name
      ],
      relations: [
        'posts',
        'posts.comments',
        'favorites',
        'favorites.author',
        'favorites.reviews',
        'reviews',
        'reviews.book',
        'comments',
        'comments.post',
      ],
    });
  }

  async addFavoriteBook(data: addFavoriteBookInput, user: UserEntity) {
    const book = await this.bookRepository.findOne({
      where: { id: data.bookId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!book) {
      throw new Error('Book not found');
    }

    user.favorites.push(book);
    await this.userRepository.save(user);
    return {
      message: 'Creado con exito',
      code: 200,
      success: true,
    };
  }
  /**
   * Sigue a un usuario en sistema
   * @param user el usuario actual
   * @param followUserId id del usuario a seguir
   * @returns 
   */
  async followUser(followUserId: string, user: UserEntity): Promise<UserEntity> {
    const followUser = await this.userRepository.findOne({ where: {id: followUserId}});

    if (!user) {
      throw new Error('User not found');
    }

    if (!followUser) {
      throw new Error('User to follow not found');
    }

    user.following.push(followUser);
    await this.userRepository.save(user);
    return user;
  }

}
