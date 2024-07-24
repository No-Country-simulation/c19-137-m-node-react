import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/authors.entity';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author-input';

@Resolver(() => Author)
export class AuthorsResolver {
    constructor(private readonly authorsService: AuthorsService) {

    }
    @Query('authors')
    findAll() {
        return this.authorsService.findAll()
    }
    @Query('author')
    findById(@Args('id') id: string){
        return this.authorsService.findById(id)
    }

    @Query('authorByName')
    findByName(@Args('name') name: string){
        return this.authorsService.findByName(name)
    }
    @Mutation('createAuthor')
    createBook(@Args('data') data: CreateAuthorInput) {
        return this.authorsService.createAuthor(data)
    }
}