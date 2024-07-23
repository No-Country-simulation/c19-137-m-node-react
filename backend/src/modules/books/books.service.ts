import {
    BadRequestException,
    Injectable,
    Logger
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entities/book.entity";
import { CreateBookInput } from "./dto/create-book-inputs";

@Injectable()
export class BooksService {
    private readonly logger = new Logger(BooksService.name);

    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {
    }
    /**
     * Consigue todos los libros
     */
    async findAll(): Promise<Book[]> {
        try {
            const books = await this.bookRepository.find({ relations: ['users'] });
            console.log("books", books);
            return books;
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    /**
     * Consigue libro segun el ID
     * @param id 
     * @returns el libro
     */
    async findById(id: string): Promise<Book> {
        try {
            const book = await this.bookRepository.findOne(
                {
                    where: { id },
                    relations: ['users']
                }
            );
            return book
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    /**
     * Crea un nuevo libro en el sistema
     * @param data 
     * @returns respuesta
     */
    async createBook(data: CreateBookInput) {
        try {
            const book = await this.bookRepository.create({ name: data.name, author: data.author, rating: data.rating });

            const savedBook = await this.bookRepository.save(book);

            return {
                book: savedBook,
                message: "Creado con exito",
                code: 200,
                success: true
            };
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}