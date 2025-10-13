import { Controller, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Body } from '@nestjs/common';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() dto: any) {
    return this.todoService.createTodo(dto);
  }
}
