import { join } from 'path';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { enviroments } from './enviroments';
import config from './config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

//API Modules
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MembershipModule } from './modules/membership/membership.module';
import { SubscriptionPlanModule } from './modules/subscription-plan/subscription-plan.module';
import { PostsModule } from './modules/posts/posts.module';
import { BooksModule } from './modules/books/books.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Context } from 'graphql-ws';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'graphiql'),
      exclude: ['/api*'],
      serveRoot: '/graphiql',
    }),
    //Variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().optional(),
        DATABASE_HOST: Joi.string().when('DATABASE_URL', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        DATABASE_NAME: Joi.string().when('DATABASE_URL', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        DATABASE_PORT: Joi.number().when('DATABASE_URL', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        DATABASE_USER: Joi.string().when('DATABASE_URL', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        DATABASE_PASSWORD: Joi.string().when('DATABASE_URL', {
          is: Joi.exist(),
          then: Joi.optional(),
          otherwise: Joi.required(),
        }),
        JWT_SECRET: Joi.string().required(),
      }),
    }),

    // Configuración de TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
    }),
    // Configuración de GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      debug: true,
      introspection: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context<any>) => {
            console.log('Conectado');
          },
        },
      },
      context: ({ req }) => ({ req }),
      formatError: (error) => {
        // Desestructuramos las propiedades del error original
        const { message, extensions } = error;

        // Devolvemos un nuevo objeto con las propiedades que queremos
        const formatted = {
          code: 400,
          message,
          success: false,
        };

        if (extensions?.originalError) {
          const originalError = error.extensions.originalError as {
            message: string | string[];
          };
          // @ts-ignore
          formatted.message = originalError.message;
        }

        return formatted;
      },
    }),
    UsersModule,
    AuthModule,
    MailModule,
    MembershipModule,
    SubscriptionPlanModule,
    PostsModule,
    BooksModule,
  ],
})
export class AppModule {}
