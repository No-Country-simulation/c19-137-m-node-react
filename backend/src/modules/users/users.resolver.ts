import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { addFavoriteBookInput } from './dto/add-favorite-book.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Query('users')
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findById(@Args('id') id: string){
    return this.usersService.findById(id);
  }

  @Mutation(() => User)
  async addFavoriteBook(
    @Args('data') data: addFavoriteBookInput,
  ) {
    return this.usersService.addFavoriteBook(data);
  }
}
