import { Resolver, Query, Args } from '@nestjs/graphql';
import { FeedService } from './feed.service';

@Resolver('Feed')
export class FeedResolver {
  constructor(private readonly feedService: FeedService) {}

  @Query('feed')
  findAll() {
    return this.feedService.findAll();
  }

  @Query('feed')
  findOne(@Args('id') id: number) {
    return this.feedService.findOne(id);
  }
}
