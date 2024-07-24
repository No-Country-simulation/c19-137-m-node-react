import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post-input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}
  @Query('posts')
  findAll() {
    return this.postsService.findAll();
  }

  @Query('post')
  findById(@Args('id') id: string) {
    return this.postsService.findById(id);
  }

  @Mutation('createPost')
  //@UseGuards(GqlAuthGuard)
  createPost(@Args('data') data: CreatePostInput) {
    return this.postsService.createPost(data);
  }
}
