import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UseGuards,
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
import { BookEntity } from '@/modules/books/entities/book.entity';
import { MediaService } from '@/modules/media/media.service';
import { Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '@/modules/auth/guards/gql-auth.guard';

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
    private readonly mediaService: MediaService,
  ) {}

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
      nickName: createUserInput.nickName,
      email: createUserInput.email,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
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
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
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
        'following',
        'followers',
      ],
    });
  }

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
      where: { userId: user.id },
    });

    //delete all existing tokens
    await this.passwordResetTokenRepository.remove(existingTokens);

    //crear un nuevo token
    const passwordResetToken = this.passwordResetTokenRepository.create({
      token,
      userId: user.id,
      expiresAt: expiresAt,
      createdAt: new Date(),
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
   * @param userId
   */
  async findTokenByUser(userId: string) {
    return this.passwordResetTokenRepository.findOne({
      where: { userId: userId },
    });
  }

  // async findByEmail(email: string): Promise<UserEntity | undefined> {
  //     return await this.userRepository.findOne({where: {email}});
  // }

  async findByNickname(nickName: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: { nickName: nickName } });
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
        { firstName: ILike(`%${name}%`) }, // Search in first_name
        { lastName: ILike(`%${name}%`) }, // Search in last_name
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

  async followUser(
    followUserId: string,
    user: UserEntity,
  ): Promise<UserEntity> {
    const followUser = await this.userRepository.findOne({
      where: { id: followUserId },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    if (!followUser) {
      throw new Error('El usuario a seguir no existe');
    }

    user.following.push(followUser);
    await this.userRepository.save(user);
    return user;
  }

  async unfollowUser(
    unfollowUserId: string,
    user: UserEntity,
  ): Promise<UserEntity> {
    // Encuentra al usuario que quiere dejar de seguir
    const unfollowUser = await this.userRepository.findOne({
      where: { id: unfollowUserId },
    });

    if (!unfollowUser) {
      throw new Error('El usuario a dejar de seguir no existe');
    }

    // Encuentra al usuario que está ejecutando la acción
    const currentUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['following'],
    });

    if (!currentUser) {
      throw new Error('El usuario actual no existe');
    }

    // Filtra al usuario de la lista de seguidores
    currentUser.following = currentUser.following.filter(
      (following) => following.id !== unfollowUserId,
    );

    // Guarda los cambios en la base de datos
    await this.userRepository.save(currentUser);

    return currentUser;
  }

  async setCoverImage(
    coverImageId: string,
    user: UserEntity,
  ): Promise<UserEntity> {
    const media = await this.mediaService.findById(coverImageId);

    if (!media) {
      throw new Error('No existe un medio con este ID ' + coverImageId);
    }

    user.coverImage = media;

    return await this.userRepository.save(user);
  }

  async setProfileImage(profileImageId: string, user: UserEntity) {
    const media = await this.mediaService.findById(profileImageId);

    if (!media) {
      throw new Error('No existe un medio con este ID' + profileImageId);
    }

    user.profileImage = media;

    return this.userRepository.save(user);
  }


}
