import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../users/entities/user.entity";
import * as process from "node:process";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = process.env.FRONTEND_URL + "/confirm?token" + token;
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Bienvenido a PageHub",
      template: "./confirmation",
      context: {
        name: user.first_name,
        confirmation_url: url
      }
    });
  }

  async sendUserPasswordReset(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: "Restablecer contraseña",
      template: "./password-recovery",
      context: {
        name: user.first_name,
        reset_url: `https://pagehub.com/reset-password?token=${token}`
      }
    });
  }
}
