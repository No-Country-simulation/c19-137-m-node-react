import { IsNotEmpty } from 'class-validator';
import { Field } from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class CreateBookInput {
  @Field()
  @IsNotEmpty({ message: 'El nombre del libro es requerido' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'El autor del libro es requerido' })
  authorId: string;

  @Field()
  @IsNotEmpty({ message: 'Debe tener rating' })
  rating: number;

  @Field()
  @IsNotEmpty({ message: 'Se necesita genero' })
  genre: string;
}
