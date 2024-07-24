import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book-inputs';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  /**
   * Consigue todos los posts
   */
  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find();
      console.log('books', books);
      return books;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createBook(data: CreateBookInput) {
    try {
      const book = await this.bookRepository.create({
        name: data.name,
        author: data.author,
      });

      const savedBook = await this.bookRepository.save(book);

      return {
        book: savedBook,
        message: 'Creado con exito',
        code: 200,
        success: true,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
