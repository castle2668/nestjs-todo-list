import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { BookModule } from './features/book/book.module';
import { BookController } from './features/book/book.controller';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [BookModule],
  controllers: [AppController, BookController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      // useClass: ValidationPipe,
      useFactory: () => new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
