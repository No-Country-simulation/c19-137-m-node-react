import {InputType, Field,} from '@nestjs/graphql';
import {IsNotEmpty, IsString, MinLength} from 'class-validator';

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty({message: 'El nickName es requerido'})
    @MinLength(4, {message: 'El nickname debe tener al menos 4 caracteres'})
    nickName: string;

    @Field()
    @IsNotEmpty({message: 'El nombre es requerido'})
    firstName: string;

    @Field()
    @IsNotEmpty({message: 'El apellido es requerido'})
    lastName: string;

    @Field()
    @IsNotEmpty({message: 'El email es requerido'})
    email: string;

    @Field()
    @IsNotEmpty({message: 'La contraseña es requerida'})
    password: string;


    @Field()
    @IsString({message: 'La biografía debe ser un texto'})
    bio: string;
}
