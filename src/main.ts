import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableCors({
    origin: 'http://mock.icp-si.com:8080',
  });
  await app.listen(3000);
}

function setupSwagger(app: INestApplication) {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('NestJS Practice')
    .setDescription('NestJS Practice API')
    .setVersion('1.0')
    .build();
  const options: SwaggerCustomOptions = { explorer: true };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
}

bootstrap();
