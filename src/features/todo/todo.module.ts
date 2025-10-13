import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { HttpModule } from '@nestjs/axios';
import { TodoListener } from './listener/todo.listenser';

@Module({
  imports: [HttpModule],
  controllers: [TodoController],
  providers: [TodoService, TodoListener],
})
export class TodoModule {}
