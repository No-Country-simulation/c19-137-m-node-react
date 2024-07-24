import {
    BadRequestException,
    Injectable,
    Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entities/user.entity";
import { Review } from "./entities/reviews.entity";
import { Book } from "../books/entities/book.entity";
import { CreateReviewInput } from "./dto/create-review-input";


@Injectable()
export class ReviewsService {

    private readonly logger = new Logger(ReviewsService.name);

    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ) {
    }
    /**
     * Consigue todos los posts
     */
    async findAll(): Promise<Review[]> {
        try {
            const reviews = await this.reviewRepository.find({ relations: ['user', 'book'] });
            console.log("reviews", reviews);
            return reviews;
        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    /**
     * Consigue post segun el ID
     * @param id 
     * @returns el post
     */
    async findById(id: string): Promise<Review> {
        try {
            const review = await this.reviewRepository.findOne(
                {
                    where: { id },
                    relations: ['user', 'book']
                }
            );
            console.log("post", review)
            return review
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
    /**
     * Crea un nuevo post
     * @param data 
     * @returns información sobre el request
     */
    async createReview(data: CreateReviewInput) {
        try {
            const user = await this.userRepository.findOne({ where: { id: data.userId } });
            const book = await this.bookRepository.findOne({ where: { id: data.bookId } });
            console.log(user)
            if (!user) {
                throw new Error("Usuario no encontrado")
            }
            if (!book) {
                throw new Error("Libro no encontrado")
            }
            const review = await this.reviewRepository.create({
                text: data.text,
                rating: data.rating,
                date_posted: new Date(),
                user: user,
                book: book
            });

            const savedReview = await this.reviewRepository.save(review);

            this.logger.log(`post: ${JSON.stringify(review)}`);
            return {
                post: savedReview,
                message: "Creado con exito",
                code: 200,
                success: true
            };
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

}



