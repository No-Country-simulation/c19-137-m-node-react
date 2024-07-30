import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entities/authors.entity';
import { CreateAuthorInput } from './dto/create-author-input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  /**
   * Consigue todos los autores
   */
  async findAll(): Promise<AuthorEntity[]> {
    try {
      const authors = await this.authorRepository.find({
        relations: ['books'],
      });
      console.log('authors', authors);
      return authors;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Consigue autor segun el ID
   * @param id
   * @returns el autor
   */
  async findById(id: string): Promise<AuthorEntity> {
    try {
      return await this.authorRepository.findOne({
        where: { id },
        relations: ['books'],
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
  async createAuthor(data: CreateAuthorInput) {
    try {
      const book = this.authorRepository.create({
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio,
        birth_date: data.birth_date,
      });

      const savedBook = await this.authorRepository.save(book);

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

  findByName(name: string) {
    console.log(name);
  }
}
