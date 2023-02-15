import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function addSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Lᵢfₑ Cₕₐₙgₑᵣ')
    .setDescription('Api for the game of life')
    .setVersion('1.0')
    .addTag('game-of-life')
    .build();
    
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true
  });
  SwaggerModule.setup('api/swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  addSwagger(app);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
