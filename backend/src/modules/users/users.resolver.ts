import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

import { addFavoriteBookInput } from './dto/add-favorite-book.input';
import { PubSub } from 'graphql-subscriptions';


@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //Lista de frases motivacionales que se van a enviar a los subscriptores
  private phrases: string[] = [
    'La vida es una aventura, atrévete.',
    'La mejor manera de predecir el futuro es inventarlo.',
    'No hay atajos para cualquier lugar al que merezca la pena ir.',
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'Cree en ti mismo y en todo lo que eres.',
  ];

  @Query('users')
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query('user')
  findById(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @Mutation(() => UserEntity)
  async addFavoriteBook(@Args('data') data: addFavoriteBookInput) {
    return this.usersService.addFavoriteBook(data);
  }
}
