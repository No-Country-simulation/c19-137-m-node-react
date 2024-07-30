import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { UserEntity } from '../users/entities/user.entity';
import { MediaModule } from '@/modules/media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), MediaModule],
  providers: [PostsService, PostsResolver],
})
export class PostsModule {}
