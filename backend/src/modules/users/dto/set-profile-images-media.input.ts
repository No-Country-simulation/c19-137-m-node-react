import {Field, InputType} from "@nestjs/graphql";
import {Response} from "@graphql/dto/response";
import {IsNotEmpty, IsUUID} from "class-validator";

export class SetProfileImagesMediaInput extends Response {
    @Field()
    @IsNotEmpty({message: 'El ID del medio es requerido'})
    @IsUUID('4', {
        message: 'El ID del medio debe ser un UUID v4'
    })
    mediaId: string;
}