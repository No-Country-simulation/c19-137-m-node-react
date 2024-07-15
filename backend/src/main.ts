import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);


console.log('\n')
  console.log('======================================');
  console.log(`🚀 Aplicación en ejecución en la URL: http://localhost:3000`);
  console.log(`🔗 Accede a Apollo Explorer en la URL : http://localhost:3000/graphql`);
  console.log(`🌞 Accede a GraphiQL en la URL : http://localhost:3000/graphiql`);

  console.log('======================================');

}
bootstrap();
