import { IsNotEmpty, maxLength } from 'class-validator';
import { Field } from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class CreatePostInput {
  @Field()
  @IsNotEmpty({ message: 'El titulo del post es requerido' })
  title: string;


    @Field()
    @IsNotEmpty({ message: 'El contenido  del post es requerido' })
    content: string;

    @Field()
    @IsNotEmpty({message: "Se necesita un autor"})
    userId: string;
}
