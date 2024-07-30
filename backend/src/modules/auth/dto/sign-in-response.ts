import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserEntity } from '@/modules/users/entities/user.entity';

@ObjectType()
export class SignInResponse {
  @Field(() => ID)
  id: string;

  @Field()
  token: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
