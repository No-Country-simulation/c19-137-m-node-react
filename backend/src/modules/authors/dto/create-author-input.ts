import { IsNotEmpty, maxLength } from 'class-validator';
import { Field } from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class CreateAuthorInput {
    @Field()
    @IsNotEmpty({ message: 'El nombre del libro es requerido' })
    first_name: string;

    @Field()
    @IsNotEmpty({ message: 'El autor del libro es requerido' })
    last_name: string;

    @Field()
    @IsNotEmpty({message: "Debe tener bio"})
    bio: string;

    @Field()
    @IsNotEmpty({message: "Debe tener rating"})
    birth_date: Date;

}