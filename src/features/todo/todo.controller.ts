import { Controller, Post, Body, Get } from '@nestjs/common';
import { TodoService } from './todo.service';
import { StorageService } from '../../modules/storage/storage.service';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  addTodo(@Body() data: any) {
    // this.todoService.addTodo(data);
    // return data;
    this.storageService.addData(data);
    return this.storageService.getData();
  }

  @Get()
  getTodos() {
    return this.storageService.getData();
  }
}
