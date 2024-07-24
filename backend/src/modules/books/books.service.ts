import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book-inputs';
import { Author } from '../authors/entities/authors.entity';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  /**
   * Consigue todos los libros
   */
  async findAll(): Promise<Book[]> {
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
  async findById(id: string): Promise<Book> {
    try {
      return await this.bookRepository.findOne({
        where: { id },
        relations: ['users', 'author'],
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByGenre(genre: string): Promise<Book[]> {
    try {
      return await this.bookRepository.find({
        where: { genre },
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
