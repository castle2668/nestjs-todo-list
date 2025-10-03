import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './features/todo/todo.controller';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [TodoModule, CopyTodoModule, CommonModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
