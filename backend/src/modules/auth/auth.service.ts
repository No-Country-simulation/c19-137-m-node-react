import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ResetPasswordInput } from './dto/reset-password-input';
import * as bcrypt from 'bcrypt';
import { jwtSecret, jwtExpirationTime } from './constants';

import { UserEntity } from '../users/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { format } from 'date-fns';
import { SignUpInput } from './dto/signup-input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Iniciar sesión
   *
   * Realiza la autenticación del usuario utilizando las credenciales proporcionadas,
   * busca el usuario por el correo electrónico y valida la contraseña, si todo es correcto
   * se genera un token de acceso (JWT) y se retorna en la respuesta encapsulada en un objeto
   *
   * @param email
   * @param password
   */
  async signIn(email: string, password: string) {
    //Buscar el usuario por el correo electrónico
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      //Si no se encuentra el usuario lanzamos una excepción
      throw new NotFoundException(
        'No se ha encontrado un usuario con el correo electrónico proporcionado',
      );
    }

    //Validar la contraseña
    const passworsIsValid = await bcrypt.compare(password, user.password);

    if (!passworsIsValid) {
      throw new UnauthorizedException(
        'La contraseña es incorrecta, verifique e intente nuevamente',
      );
    }
    //Generar token
    const token = this.generateToken(user);

    //Fecha Hora| Minutos| Segundos
    const expireAt = format(
      new Date(Date.now() + jwtExpirationTime * 1000),
      'yyyy-MM-dd HH:mm:ss',
    );
    //Retornar la respuesta
    return {
      code: 200,
      message: 'Inicio de sesión exitoso',
      success: true,
      token: token,
      expire_at: expireAt,
    };
  }

  /**
   * Registrarse
   *
   * Registro de un nuevo usuario
   * @param input
   */
  async signUp(input: SignUpInput) {
    try {
      const { email, nickname } = input;

      await this.checkUserExists(email, nickname);

      //Crear el usuario

      const newUser = await this.usersService.create(input);

      //generar el token de acceso

      const token = this.generateToken(newUser);

      //Enviar correo electrónico de confirmación
      await this.mailService.sendUserConfirmation(newUser, token);

      return {
        code: 200,
        message: 'Registro exitoso',
        success: true,
        token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Olvidé mi contraseña
   * Enviar correo electrónico para restablecer la contraseña
   * @param email
   */
  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(
        'No se ha encontrado un usuario con el correo electrónico proporcionado',
      );
    }

    const token = this.generateToken(user);
    // const existingToken = await this.usersService.findTokenByUser(user.id);

    // if (existingToken && existingToken.expires_at > new Date()) {
    //   return {
    //     code: 200,
    //     message:
    //       'Ya se ha enviado una solicitud de restablecimiento de contraseña a este email, espere 1 hora para solicitar un nuevo enlace',
    //     success: true,
    //   };
    // }

    const expirationDate = new Date(Date.now() + 3600000);

    //Crear el token en la base de datos
    await this.usersService.createPasswordResetToken(
      user,
      token,
      expirationDate,
    );

    //Logica para enviar el correo electrónico

    try {
      await this.mailService.sendUserPasswordReset(user, token);
    } catch (error) {
      throw new Error(
        'Ha ocurrido un error al enviar el correo electrónico, intente nuevamente',
      );
    }
    return {
      code: 200,
      message:
        'Se ha enviado un correo electrónico para restablecer la contraseña',
      success: true,
    };
  }

  /**
   * Restablecer contraseña
   *
   * Restablecer la contraseña de un usuario
   * @param data
   */
  async resetPassword(data: ResetPasswordInput) {
    const { token, newPassword } = data;

    //validamos si el token no esta en la base de datos
    const passwordResetToken = await this.usersService.findToken(token);

    if (!passwordResetToken) {
      throw new NotFoundException(
        'El token no es válido, por favor solicite uno nuevo',
      );
    }

    //Verificar el token y obtener el usuario
    const user = await this.verifyToken(token);

    if (!user) {
      return {
        code: 404,
        message:
          'No se ha encontrado un usuario con el correo electrónico proporcionado',
        success: false,
      };
    }

    //actualizar la contraseña
    await this.usersService.update({
      id: user.id,
      password: await bcrypt.hash(newPassword, 10),
    });

    //Eliminar el token de la base de datos
    await this.usersService.deleteToken(passwordResetToken.id);
    return {
      code: 200,
      message: 'Contraseña restablecida con éxito',
      success: true,
      user,
    };
  }

  /**
   * Obtener usuario actual
   * @param req
   */
  async me(req: { headers: { authorization: string } }): Promise<UserEntity> {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = this.jwtService.verify(token);
    return this.usersService.findByEmail(decoded.email);
  }

  /**
   * Verificar token
   *
   * Verificar la validez de un token
   * @param token
   * @param clockTolerance
   */
  verifyToken(token: string, clockTolerance = 60) {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
      clockTolerance: clockTolerance,
    });

    const user = this.usersService.findByEmail(decoded.email);

    if (!user) {
      throw new BadRequestException(
        'No se ha encontrado un usuario con las credenciales proporcionadas',
      );
    }
    return user;
  }

  private generateToken(user: UserEntity): string {
    return this.jwtService.sign(
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        sub: user.id,
      },
      { secret: jwtSecret, expiresIn: jwtExpirationTime },
    );
  }

  private async checkUserExists(
    email: string,
    nickname: string,
  ): Promise<void> {
    const userByEmail = await this.usersService.findByEmail(email);
    if (userByEmail) {
      throw new BadRequestException(
        'Ya existe un usuario con el correo electrónico proporcionado',
      );
    }

    const userByNickname = await this.usersService.findByNickname(nickname);
    if (userByNickname) {
      throw new BadRequestException(
        'Ya existe un usuario con el nickname proporcionado',
      );
    }
  }
}
