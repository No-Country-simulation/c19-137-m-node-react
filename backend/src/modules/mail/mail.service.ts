import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '../users/entities/user.entity';
import * as process from 'node:process';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = process.env.FRONTEND_URL + '/confirm?token' + token;
    const appName = process.env.APP_NAME || 'Book Talks';
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bienvenido a' + appName,
      template: './confirmation',
      context: {
        name: user.first_name,
        confirmation_url: url,
      },
    });
  }

  async sendUserPasswordReset(user: UserEntity, token: string) {
    const url = process.env.FRONTEND_URL + '/reset-password?token' + token;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Restablecer contraseña',
      template: './password-recovery',
      context: {
        name: user.first_name,
        reset_url: url,
      },
    });
  }
}
