import {Field, ObjectType} from "@nestjs/graphql";
import {UserEntity} from "@/modules/users/entities/user.entity";
import {Response} from "@graphql/dto/response";

@ObjectType()
export class SetProfileResponse extends Response {
    @Field(() => UserEntity, {nullable: true})
    user?: UserEntity;
}

