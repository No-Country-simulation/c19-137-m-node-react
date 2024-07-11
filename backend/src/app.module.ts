import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Configuración de TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres', // o el tipo de base de datos que uses (mysql, sqlite, etc.)
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'mydatabase',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // No usar en producción
    }),
    // Configuración de GraphQL
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,  // Desactivar en producción
    }),
    // Módulos de la aplicación
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
