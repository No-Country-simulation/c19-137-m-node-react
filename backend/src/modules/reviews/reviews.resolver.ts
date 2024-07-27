import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { ReviewEntity } from './entities/reviews.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review-input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Resolver(() => ReviewEntity)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}
  @Query('reviews')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query('review')
  findById(@Args('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @Mutation('createReview')
  @UseGuards(GqlAuthGuard)
  createReview(@Args('data') data: CreateReviewInput, @CurrentUser() user: UserEntity) {
    return this.reviewsService.createReview(data, user)
  }
}
