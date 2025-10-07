import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoController } from './features/todo/todo.controller';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { CommonModule } from './modules/common/common.module';
import { MessageModule } from './modules/message/message.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpFilter } from './filters/http/http.filter';
import { AppService } from './app.service';

@Module({
  imports: [TodoModule, CopyTodoModule, CommonModule, MessageModule],
  controllers: [AppController, TodoController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
