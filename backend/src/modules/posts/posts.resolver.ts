import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post-input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostEntity], { name: 'posts' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => PostEntity, { name: 'post' })
  @UseGuards(GqlAuthGuard)
  findById(@Args('id') id: string) {
    return this.postsService.findById(id);
  }

  @Mutation('createPost')
  @UseGuards(GqlAuthGuard)
  createPost(
    @Args('data') data: CreatePostInput,
    @CurrentUser() user: UserEntity,
  ) {
    try {
      const post = this.postsService.createPost(data, user);
      return {
        code: 200,
        message: 'Post creado exitosamente',
        success: true,
        post,
      };
    } catch (error) {
      console.log('error', error);
      return {
        code: 400,
        message: error.message,
        success: false,

      };
    }
  }
}
