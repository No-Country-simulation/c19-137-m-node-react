import { CreateMembershipInput } from './create-membership.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMembershipInput extends PartialType(CreateMembershipInput) {
  @Field()
  @IsNotEmpty()
  id: string;
}
