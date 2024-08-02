import { join } from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import config from './config';

import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloSandboxMiddleware } from './middleware/apollo-sandbox.middleware';

//API Modules
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MembershipModule } from './modules/membership/membership.module';
import { SubscriptionPlanModule } from './modules/subscription-plan/subscription-plan.module';
import { PostsModule } from './modules/posts/posts.module';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Context } from 'graphql-ws';
import { BooksModule } from '@/modules/books/books.module';
import { AuthorsModule } from '@/modules/authors/authors.module';
import { ReviewsModule } from '@/modules/reviews/reviews.module';
import { CommentsModule } from '@/modules/comments/comments.module';
import { FeedModule } from '@/modules/feed/feed.module';
import { MediaModule } from './modules/media/media.module';

import { graphqlUploadExpress } from 'graphql-upload-ts';
import { ApolloPrelightMiddleware } from '@/middleware/apollo-prelight.middleware';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from '@/modules/PubSubModule';

const pubSub = new PubSub();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'graphiql'),
      exclude: ['/api*'],
      serveRoot: '/graphiql',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api*'],
      serveRoot: '/uploads',
    }),
    //Variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [config],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().port().default(3000),
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
        DATABASE_PASSWORD: Joi.optional(),
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
            console.log('Conectado', context);
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
    AuthorsModule,
    ReviewsModule,
    CommentsModule,
    FeedModule,
    MediaModule,
    PubSubModule,
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: pubSub,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApolloSandboxMiddleware).forRoutes('*');

    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
      .forRoutes('graphql');

    consumer.apply(ApolloPrelightMiddleware).forRoutes('graphql');
  }
}
