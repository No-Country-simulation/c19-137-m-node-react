import {CreateUserInput} from './create-user.input';
import {PartialType} from '@nestjs/mapped-types';
import {Field} from "@nestjs/graphql";

export class UpdateUserInput extends PartialType(CreateUserInput) {

    @Field()
    id: string;

}
