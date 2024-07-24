import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksResolver } from './books.resolver';
import { BooksService } from './books.service';
import { Author } from '../authors/entities/authors.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Book, Author])],
    providers:[BooksService, BooksResolver],
    exports:[BooksService]
})
export class BooksModule {}
