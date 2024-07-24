import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book-inputs';
import { AuthorEntity } from '../authors/entities/authors.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  /**
   * Consigue todos los libros
   */
  async findAll(): Promise<BookEntity[]> {
    try {
      const books = await this.bookRepository.find({
        relations: ['users', 'author'],
      });
      console.log('books', books);
      return books;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Consigue libro segun el ID
   * @param id
   * @returns el libro
   */
  async findById(id: string): Promise<BookEntity> {
    try {
      return await this.bookRepository.findOne({
        where: { id },
        relations: ['users', 'author'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Crea un nuevo libro en el sistema
   * @param data
   * @returns respuesta
   */
  async createBook(data: CreateBookInput) {
    try {
      const author = await this.authorRepository.findOne({
        where: { id: data.authorId },
      });

      const book = this.bookRepository.create({
        name: data.name,
        author: author,
        rating: data.rating,
        genre: data.genre,
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
