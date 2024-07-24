import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post-input';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostEntity], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => PostEntity, { name: 'post' })
  findById(@Args('id') id: string) {
    return this.postsService.findById(id);
  }

  @Mutation('createPost')
  @UseGuards(GqlAuthGuard)
  createPost(@Args('data') data: CreatePostInput) {
    return this.postsService.createPost(data);
  }
}
