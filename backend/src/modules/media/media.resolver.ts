import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MediaService } from './media.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { MediaResponse } from '@/modules/media/dto/media-response';

import * as process from 'node:process';

@Resolver('Media')
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Mutation(() => MediaResponse)
  async uploadMedia(
    @Args('file', { type: () => GraphQLUpload })
    mediaInput: {
      file: FileUpload;
    },
    @Args('convertToBase64', { nullable: true }) convertToBase64: boolean,
  ) {
    try {
      const media = await this.mediaService.uploadMedia(
        mediaInput,
        convertToBase64,
      );
      const url = `${process.env.URL}/uploads/${media.hash_name}`;

      return {
        code: 200,
        message: 'Medio cargado exitosamente',
        success: true,
        media: {
          id: media.id,
          hashName: media.hash_name,
          fileName: media.file_name,
          mimeType: media.mime_type,
          size: media.size,
          url: url,
          type: media.type,
          base64: media.base64,
          createdAt: media.createdAt,
          updatedAt: media.updatedAt,
        },
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
