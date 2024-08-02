import {Field, InputType} from "@nestjs/graphql";
import {Response} from "@graphql/dto/response";
import {IsNotEmpty, IsUUID} from "class-validator";

export class SetProfileImagesMediaInput extends Response {
    @Field()
    @IsNotEmpty({message: 'El ID del medio es requerido'})
    @IsUUID()
    mediaId: string;
}