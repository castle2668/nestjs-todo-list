import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('todos')
export class TodoController {
  @Get()
  getTodos() {
    return ['Todo 1', 'Todo 2', 'Todo 3'];
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return id;
  }

  @Post()
  createTodo(@Body() data: any) {
    return data;
  }
}
