import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class SignInResponse {
  @Field((type) => ID)
  id: string;

  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
