import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CommentsService } from './comments.service';
import { PostCommentInput } from './dto/post-comment-input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {
  }

  @Query('comment')
  findById(@Args('id') id: string) {
    return this.commentsService.findById(id);
  }

  @Mutation('postComment')
  @UseGuards(GqlAuthGuard)
  createReview(@Args('data') data: PostCommentInput, @CurrentUser() user: UserEntity) {
    return this.commentsService.postComment(data, user)
  }
}
