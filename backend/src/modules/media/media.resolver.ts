import {Resolver, Mutation, Args} from '@nestjs/graphql';
import {MediaService} from './media.service';
import {FileUpload, GraphQLUpload} from 'graphql-upload-ts';
import {MediaResponse} from '@/modules/media/dto/media-response';

import * as process from 'node:process';

@Resolver('Media')
export class MediaResolver {
    constructor(private readonly mediaService: MediaService) {
    }

    @Mutation(() => MediaResponse)
    async uploadMedia(
        @Args('file', {type: () => GraphQLUpload})
            mediaInput: {
            file: FileUpload;
        },
        @Args('convertToBase64', {nullable: true}) convertToBase64: boolean,
    ) {
        try {
            const media = await this.mediaService.uploadMedia(
                mediaInput,
                convertToBase64,
            );
            const url = `${process.env.URL}/uploads/${media.hashName}`;

            return {
                code: 200,
                message: 'Medio cargado exitosamente',
                success: true,
                media: media
            };
        } catch (error) {
            return {
                code: 400,
                message: error.message,
                success: false,
            };
        }
    }
}
