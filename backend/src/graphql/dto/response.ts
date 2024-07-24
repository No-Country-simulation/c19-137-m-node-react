import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field()
  code: number;
}
