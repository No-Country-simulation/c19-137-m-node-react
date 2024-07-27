import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { BookEntity } from './entities/book.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book-inputs';


@Resolver(() => Book)
export class BooksResolver {
    constructor(private readonly booksService: BooksService) {

    }
    @Query('books')
    findAll() {
        return this.booksService.findAll()
    }
    @Query('book')
    findById(@Args('id') id: string){
        return this.booksService.findById(id)
    }
    @Query('bookByGenre')
    findByGenre(@Args('genre') genre: string){
        return this.booksService.findByGenre(genre)
    }
    @Mutation('createBook')
    @UseGuards(GqlAuthGuard)
    createBook(@Args('data') data: CreateBookInput) {
        return this.booksService.createBook(data)
    }
}
