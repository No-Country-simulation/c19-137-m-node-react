import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'El nickname es requerido' })
  nickname: string;

  @Field()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  first_name: string;

  @Field()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  last_name: string;

  @Field()
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

}
