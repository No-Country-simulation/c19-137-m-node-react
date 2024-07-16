import { Resolver, Query, Subscription } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { UseGuards } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";
import { Cron, CronExpression } from "@nestjs/schedule";

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolver {

  //Lista de frases motivacionales que se van a enviar a los subscriptores
  private phrases: string[] = [
    "La vida es una aventura, atrévete.",
    "La mejor manera de predecir el futuro es inventarlo.",
    "No hay atajos para cualquier lugar al que merezca la pena ir.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Cree en ti mismo y en todo lo que eres."
  ];

  constructor(private readonly usersService: UsersService) {
  }


  @Query("users")
  @UseGuards(GqlAuthGuard)
  findAll() {
    console.log("Consultando todos los usuarios");
    return this.usersService.findAll();
  }

  @Subscription("onUserCreated")
  onUserCreated() {
    return pubSub.asyncIterator("onUserCreated");
  }

  /**
   * Subscription que que retorna un frase motivacional aleatoria a los subscriptores
   */
  @Subscription()
  onTextHelloCreated() {
    return pubSub.asyncIterator("onTextHelloCreated");
  }

  /**
   * Método que se ejecuta cada 5 segundos y envía una frase motivacional aleatoria a los subscriptores
   */
  @Cron(CronExpression.EVERY_5_SECONDS)
  onTextHelloTrigger() {
    console.log(" 🚀 onTextHelloTrigger");
    pubSub.publish("onTextHelloCreated", {
      onTextHelloCreated: this.phrases[Math.floor(Math.random() * this.phrases.length)]
    });

  }

}
