import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMembershipInput {
  @Field()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @Field(() => Int)
  @IsNotEmpty({ message: 'El costo es requerido' })
  cost: number;

  @Field(() => Int)
  @IsNotEmpty({ message: 'La duración de la suscripción es requerida' })
  duration: number;
}
