import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInInput {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
