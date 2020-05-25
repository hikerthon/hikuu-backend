import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MobileappModule } from './mobile/mobileapp.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrapApp() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Hikoo')
    .setDescription('Hikoo Web API')
    .setVersion('1.0')
    .addTag('hikoo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

async function bootstrapMobile() {
  const mobileApp = await NestFactory.create(MobileappModule);
  const mOptions = new DocumentBuilder()
    .setTitle('Hikoo Mobile')
    .setDescription('Hikoo Mobile API')
    .setVersion('1.0')
    .addTag('hikoo')
    .build();
  const mDocument = SwaggerModule.createDocument(mobileApp, mOptions);
  SwaggerModule.setup('api', mobileApp, mDocument);

  mobileApp.useGlobalPipes(new ValidationPipe());

  await mobileApp.listen(3001);
}

async function bootstrap() {
  await bootstrapApp();
  await bootstrapMobile();
}

bootstrap();
