import { Field } from "@nestjs/graphql";
import {IsNotEmpty, MinLength, Validate  } from 'class-validator';
import { MatchPasswordsValidator } from '../validators/match-passwords.validator';



export class ResetPasswordInput {
    @Field()
    @IsNotEmpty({ message: 'El token es requerido' })
    token: string;
  
    @Field()
    @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
    newPassword: string;
  
    @Field()
    @IsNotEmpty({ message: 'La confirmación de la nueva contraseña es requerida' })
    @Validate(MatchPasswordsValidator)
    confirmNewPassword: string;
}

