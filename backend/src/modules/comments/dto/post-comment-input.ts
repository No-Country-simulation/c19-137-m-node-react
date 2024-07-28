import { IsNotEmpty } from 'class-validator';
import { Field } from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class PostCommentInput {
  @Field()
  @IsNotEmpty({ message: 'El texto del comentario es requerido' })
  text: string;

  @Field()
  @IsNotEmpty({ message: 'El post del comentario es requerido' })
  postId: string;
}
