import { Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordInput {
  @Field()
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  email: string;
}