import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateSubscriptionPlanInput } from './create-subscription-plan.input';

@InputType()
export class UpdateSubscriptionPlanInput extends PartialType(
  CreateSubscriptionPlanInput,
) {
  @Field()
  id: string;
}
