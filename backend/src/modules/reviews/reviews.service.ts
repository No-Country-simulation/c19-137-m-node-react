import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { ReviewEntity } from './entities/reviews.entity';
import { BookEntity } from '../books/entities/book.entity';
import { CreateReviewInput } from './dto/create-review-input';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  /**
   * Consigue todos los posts
   */
  async findAll(): Promise<ReviewEntity[]> {
    try {
      const reviews = await this.reviewRepository.find({
        relations: ['user', 'book'],
      });
      console.log('reviews', reviews);
      return reviews;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Consigue post segun el ID
   * @param id
   * @returns el post
   */
  async findById(id: string): Promise<ReviewEntity> {
    try {
      const review = await this.reviewRepository.findOne({
        where: { id },
        relations: ['user', 'book'],
      });
      console.log('post', review);
      return review;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crea un nuevo post
   * @param data
   * @returns información sobre el request
   */
  async createReview(data: CreateReviewInput) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: data.userId },
      });
      const book = await this.bookRepository.findOne({
        where: { id: data.bookId },
      });
      console.log(user);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      if (!book) {
        throw new Error('Libro no encontrado');
      }
      const review = await this.reviewRepository.create({
        text: data.text,
        rating: data.rating,
        date_posted: new Date(),
        user: user,
        book: book,
      });

      const savedReview = await this.reviewRepository.save(review);

      this.logger.log(`post: ${JSON.stringify(review)}`);
      return {
        post: savedReview,
        message: 'Creado con exito',
        code: 200,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
