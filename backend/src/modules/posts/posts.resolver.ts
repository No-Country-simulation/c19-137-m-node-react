import {Resolver, Query, Mutation, Args, Subscription} from '@nestjs/graphql';
import {PostsService} from './posts.service';
import {PostEntity} from './entities/post.entity';
import {GqlAuthGuard} from 'src/modules/auth/guards/gql-auth.guard';
import {Inject, UseGuards} from '@nestjs/common';
import {CreatePostInput} from './dto/create-post-input';
import {CurrentUser} from '../auth/decorators/current-user.decorator';
import {UserEntity} from '../users/entities/user.entity';
import {PubSub} from "graphql-subscriptions";

@Resolver(() => PostEntity)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
        @Inject('PUB_SUB') private pubSub: PubSub,
    ) {
    }

    @Query(() => [PostEntity], {name: 'posts'})
    @UseGuards(GqlAuthGuard)
    findAll() {
        return this.postsService.findAll();
    }

    @Query(() => PostEntity, {name: 'post'})
    @UseGuards(GqlAuthGuard)
    findById(@Args('id') id: string) {
        return this.postsService.findById(id);
    }

    @Mutation(() => PostEntity, {name: 'createPost'})
    @UseGuards(GqlAuthGuard)
    async createPost(
        @Args('data') data: CreatePostInput,
        @CurrentUser() user: UserEntity,
    ) {
        try {
            const post = await this.postsService.createPost(data, user);

            // Publicar el post creado para los seguidores del usuario
            user.followers.forEach(follower => {
                this.pubSub.publish(`onPostChanged_${follower.id}`, {
                    onPostChanged: post,
                });
            });

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

    @Subscription(() => PostEntity, {
        filter: (payload, variables) => variables.userIds.includes(payload.onPostChanged.userId),
        resolve: (value) => value.onPostChanged,
    })
    onPostChanged(
        @Args('userIds', {type: () => [String]}) userIds: string[],
    ) {
        return this.pubSub.asyncIterator(userIds.map(userId => `onPostChanged_${userId}`));
    }
}
