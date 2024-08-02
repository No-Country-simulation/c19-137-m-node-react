import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { Inject, UseGuards } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post-input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

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

  @Mutation(() => PostEntity, { name: 'createPost' })
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('data') data: CreatePostInput,
    @CurrentUser() user: UserEntity,
  ) {
    try {
      const post = await this.postsService.createPost(data, user);

      // Publicar el post creado para todos los subscriptores
      this.pubSub.publish('onSSEvent', {
        onSSEvent: {
          type: 'created',
          ...post
        },
      });

      if (user.followers) {
        console.log('Publicando post para los seguidores del usuario');
        console.log('Seguidores del usuario', user.followers);
        // Publicar el post creado para los seguidores del usuario
        user.followers.forEach((follower) => {
          this.pubSub.publish(`onPostChanged_${follower.id}`, {
            onPostChanged: {
              type: 'created',
              ...post
            },
          });
        });
      }
      return {
        code: 200,
        message: 'Post creado exitosamente',
        success: true,
        post,
      };
    } catch (error) {
      console.log('Error al crear el post', error);
      return {
        code: 400,
        message: error.message,
        success: false,
      };
    }
  }

  @Subscription(() => PostEntity)
  onPostChanged(@Args('userIds', { type: () => [String] }) userIds: string[]) {
    console.log('UserIds:', userIds);

    const users = userIds.map((userId) => `onPostChanged_${userId}`);

    return this.pubSub.asyncIterator(users);
  }

  @Subscription(() => PostEntity)
  onSSEvent() {
    return this.pubSub.asyncIterator('onSSEvent');
  }
}
