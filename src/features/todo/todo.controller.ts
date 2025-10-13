import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { map } from 'rxjs';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos().pipe(map((data) => data));
  }
}
