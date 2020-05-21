import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MobileappModule } from './mobile/mobileapp.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const mobileApp = await NestFactory.create(MobileappModule);

  const options = new DocumentBuilder()
    .setTitle('Hikoo')
    .setDescription('Hikoo API')
    .setVersion('1.0')
    .addTag('hikoo')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const mOptions = new DocumentBuilder()
    .setTitle('Hikoo Mobile')
    .setDescription('Hikoo Mobile API')
    .setVersion('1.0')
    .addTag('hikoo')
    .build();
  const mDocument = SwaggerModule.createDocument(mobileApp, mOptions);
  SwaggerModule.setup('api', mobileApp, mDocument);

  app.useGlobalPipes(new ValidationPipe());
  mobileApp.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  await mobileApp.listen(3001)
}
bootstrap();
