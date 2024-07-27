import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as process from 'node:process';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());


  // Configura CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Permite a localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Permite todos los métodos HTTP
    allowedHeaders: 'Content-Type, Authorization', // Permite las cabeceras especificadas
    credentials: true, // Permite el envío de cookies o cabeceras de autenticación
  });

  const port = process.env.PORT || 3000;
  const httpUrl = process.env.URL || `http://localhost:${port}`;
  const wsUrl = process.env.WS_URL || `ws://localhost:${port}`;


    await app.listen(port);

    app.enableCors({
        origin: '*',
        credentials: true,
    });

    console.log('\n');
    console.log('======================================');
    console.log(`🚀 Servidor corriendo en la URL: ${httpUrl}`);
    console.log(`🔗 Accede a Apollo Explorer en la URL : ${httpUrl}/graphql`);
    console.log(`🌞 Accede a GraphiQL en la URL : ${httpUrl}/graphiql`);
    console.log(`📢 GraphQL Subscriptions en la URL : ${wsUrl}/graphql`);

    console.log('======================================');
}

bootstrap();
