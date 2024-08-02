import {IsArray, IsNotEmpty, IsOptional, IsString, ValidateIf} from 'class-validator';
import {Field} from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class CreatePostInput {
    @Field()
    @IsNotEmpty({message: 'El titulo del post es requerido'})
    title: string;

    @Field()
    @IsNotEmpty({message: 'El contenido  del post es requerido'})
    content: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsArray({ message: 'Los ids de los medios deben ser un array' })
    @IsString({ each: true, message: 'Cada id de media debe ser un string' })
    mediaIds: string[];
}
