import { CreateUserInput } from '@/modules/users/dto/create-user.input';
import { Field } from '@nestjs/graphql';
import { IsNotEmpty, Validate } from 'class-validator';

export class SignUpInput extends CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @Field()
  @IsNotEmpty({ message: 'La confirmación de la contraseña es requerida' })
  passwordConfirmation: string;
}
