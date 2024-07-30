import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from '@/modules/media/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [MediaResolver, MediaService],
  exports: [MediaService],
})
export class MediaModule {}
