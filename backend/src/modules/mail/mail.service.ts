import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {

  constructor(private readonly mailerService: MailerService) {
  }

  async sendUserConfirmation(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bienvenido a PageHub',
      template: './user-confirmation',
      context: {
        name: user.first_name,
        url: 'https://pagehub.com/confirm?token=123456',
      },
    });
  }

  async sendUserPasswordReset(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Restablecer contraseña',
      template: './password-recovery',
      context: {
        name: user.first_name,
        reset_url: `https://pagehub.com/reset-password?token=${token}`,
      },
    });
  }


}
