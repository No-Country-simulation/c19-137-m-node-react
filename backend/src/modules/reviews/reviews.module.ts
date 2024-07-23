import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/reviews.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';

@Module({
    imports:[TypeOrmModule.forFeature([Review, User, Book])],
    providers:[ReviewsService, ReviewsResolver],
    exports:[ReviewsService]
})
export class ReviewsModule {}
