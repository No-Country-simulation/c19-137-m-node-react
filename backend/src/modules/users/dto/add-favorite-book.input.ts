import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class addFavoriteBookInput {
  @Field()
  @IsNotEmpty({ message: 'El usuario es requerido' })
  @IsUUID()
  userId: string;

  @Field()
  @IsNotEmpty({ message: 'El libro es requerido' })
  @IsUUID()
  bookId: string;
}
