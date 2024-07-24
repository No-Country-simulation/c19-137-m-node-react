import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { AuthorEntity } from '../authors/entities/authors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
})
export class BooksModule {}
