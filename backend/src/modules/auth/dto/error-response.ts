import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ErrorResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field()
  code: number;
}