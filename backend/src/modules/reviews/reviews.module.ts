import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/reviews.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BookEntity } from '../books/entities/book.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity, UserEntity, BookEntity])],
  providers: [ReviewsService, ReviewsResolver],
  exports: [ReviewsService],
})
export class ReviewsModule {}
