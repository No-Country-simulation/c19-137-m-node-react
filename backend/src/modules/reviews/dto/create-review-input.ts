import { IsNotEmpty} from 'class-validator';
import { Field } from '@nestjs/graphql';

/**
 * @docs https://docs.nestjs.com/techniques/validation
 */
export class CreateReviewInput {
    @Field()
    @IsNotEmpty({ message: 'El texto de la review es requerido' })
    text: string;

    @Field()
    @IsNotEmpty({ message: 'El autor de la review es requerido' })
    userId: string;

    @Field()
    @IsNotEmpty({ message: 'El libro de la review es requerido' })
    bookId: string;

    @Field()
    @IsNotEmpty({message: "Debe tener rating"})
    rating: number;

}
