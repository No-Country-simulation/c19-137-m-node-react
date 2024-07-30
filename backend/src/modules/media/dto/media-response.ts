import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from '@graphql/dto/response';

@ObjectType()
export class MediaResponse extends Response {
  @Field()
  url: string;

  @Field()
  fileName: string;

  @Field()
  mimeType: string;

  @Field()
  size: number;

  @Field()
  base64: string;

  @Field()
  hashName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  type: string;
}
