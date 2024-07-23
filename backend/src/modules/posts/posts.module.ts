import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { User } from '../users/entities/user.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Post, User])],
    providers:[PostsService, PostsResolver],
    exports:[PostsService]
})
export class PostsModule {}
