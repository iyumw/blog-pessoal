import { ValidationPipe }  from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

// Habilitando globalmente a validação de dados
  app.useGlobalPipes(new ValidationPipe());

// Habilitando CORS (Cross-Origin Resource Sharing)
  app.enableCors();

// Configura o fuso hoário
  process.env.TZ = '-03:00'

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
