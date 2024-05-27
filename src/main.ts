import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule); 

    const options = new DocumentBuilder()
        .setTitle('FOOD TRUCK')
        .setDescription('API to fetch')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    const port = 3000;
  await app.listen(port);

}
bootstrap(); 

