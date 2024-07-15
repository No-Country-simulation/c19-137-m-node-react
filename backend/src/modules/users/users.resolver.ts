import { Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { HasRole } from '../auth/decorators/roles.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }


  @Query('users')
  @UseGuards(GqlAuthGuard)
  findAll() {
    console.log('Consultando todos los usuarios');
    return this.usersService.findAll();
  }
}
