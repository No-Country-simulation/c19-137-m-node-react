// src/modules/users/users.service.ts
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
import { PasswordResetToken } from './entities/password-reset-token.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetTokenRepository: Repository<PasswordResetToken>,
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
      throw new InternalServerErrorException('Password is required');
    }
    const hashedPassword = await this.hashPassword(createUserInput.password);
    const user = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  /**
   * Buscar todos los usuarios
   */
  async findAll(): Promise<User[]> {

    const users = await this.userRepository.find();

    console.log('users', users);
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


  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
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

  async findByNickname(nickname: string) {
    return this.userRepository.findOne({ where: { nickname } });
  }
}