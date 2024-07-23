// src/modules/users/users.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import * as bcrypt from "bcrypt";
import { PasswordResetToken } from "./entities/password-reset-token.entity";
import { PubSub } from "graphql-subscriptions";
import { addFavoriteBookInput } from "./dto/add-favorite-book.input";
import { Book } from "../books/entities/book.entity";

const pubSub = new PubSub();

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>
  ) {
  }

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
  async create(createUserInput: CreateUserInput): Promise<User> {
    this.logger.log(`createUserInput: ${JSON.stringify(createUserInput)}`);

    if (!createUserInput.password) {
      throw new InternalServerErrorException("Password is required");
    }
    const hashedPassword = await this.hashPassword(createUserInput.password);
    const userValidated = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword
    });
    const user = await this.userRepository.save(userValidated);

    pubSub.publish("onUserCreated", { onUserCreated: user });
    return user;
  }

  /**
   * Buscar todos los usuarios
   */
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({ relations: ['posts', 'favorites'] });

    console.log("users", users);
    return users;
  }

  /**
   * Buscar un usuario por nickname
   * @param nickname
   */
  async findByNickName(nickname: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { nickname } });
  }

  /**
   * Actualizar un usuario
   * @param updateUserInput
   */
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(updateUserInput.id, updateUserInput);
    return this.userRepository.findOne({
      where: { id: updateUserInput.id }
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
    return this.userRepository.findOne({ where: { email }, relations: ['posts', 'favorites'] });
  }
  /**
   * Busca un usuario por ID
   * @param id 
   * @returns el usuario
   */
  async findById(id: string): Promise<User> {
    try {
      const post = await this.userRepository.findOne(
        {
          where: { id: id },
          relations: ['posts', 'favorites']
        }
      );
      console.log("post", post)
      return post
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  /**
   * Crear un token de restablecimiento de contraseña
   * @param user
   * @param token
   * @param expiresAt
   */
  async createPasswordResetToken(user: User, token: string, expiresAt: Date) {
    //eliminar cualquier token existente
    const existingTokens = await this.passwordResetTokenRepository.find({
      where: { user_id: user.id }
    });

    //delete all existing tokens
    await this.passwordResetTokenRepository.remove(existingTokens);

    //crear un nuevo token
    const passwordResetToken = this.passwordResetTokenRepository.create({
      token,
      user_id: user.id,
      expires_at: expiresAt,
      created_at: new Date()
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

  async findByNickname(nickname: string) {
    return this.userRepository.findOne({ where: { nickname } });
  }

  async addFavoriteBook(data: addFavoriteBookInput) {
    console.log(data)
    const user = await this.userRepository.findOne(
      {
        where: { id: data.userId },
        relations: ['favorites']
      });
    const book = await this.bookRepository.findOne({ where: { id: data.bookId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!book) {
      throw new Error('Book not found');
    }

    user.favorites.push(book);
    await this.userRepository.save(user);
    return {
      message: "Creado con exito",
      code: 200,
      success: true
    };
  }
}
