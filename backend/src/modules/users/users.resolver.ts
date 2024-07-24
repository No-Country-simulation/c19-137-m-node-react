import { Resolver, Query, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Cron, CronExpression } from '@nestjs/schedule';

const pubSub = new PubSub();

@Resolver(() => UserEntity)
export class UsersResolver {
  //Lista de frases motivacionales que se van a enviar a los subscriptores
  private phrases: string[] = [
    'La vida es una aventura, atrévete.',
    'La mejor manera de predecir el futuro es inventarlo.',
    'No hay atajos para cualquier lugar al que merezca la pena ir.',
    'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
    'Cree en ti mismo y en todo lo que eres.',
  ];

  constructor(private readonly usersService: UsersService) {}

  /**
   * Consulta para obtener todos los usuarios
   */
  @Query(() => [UserEntity], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Subscription para obtener la frase motivacional
   */
  @Subscription(() => String)
  onMotivationalPhrase() {
    return pubSub.asyncIterator('onMotivationalPhrase');
  }

  /**
   * Método que se ejecuta cada 5 segundos y envía una frase motivacional aleatoria a los subscriptores
   */
  @Cron(CronExpression.EVERY_5_SECONDS)
  async onMotivationalPhraseTrigger() {
    console.log(' 🚀 Enviando frase motivacional');
    await pubSub.publish('onMotivationalPhrase', {
      onMotivationalPhrase:
        this.phrases[Math.floor(Math.random() * this.phrases.length)],
    });
  }
}
