import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
export class SignInResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  token: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
