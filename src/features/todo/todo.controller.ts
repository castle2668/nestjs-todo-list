import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';

@Controller('todos')
export class TodoController {
  public todos: any[] = [];

  @Get()
  getTodos(
    @Query('skip') skip: string = '0',
    @Query('limit') limit: string = '10',
  ) {
    const skipNum = parseInt(skip) || 0;
    const limitNum = parseInt(limit) || 10;
    return this.todos.slice(skipNum, skipNum + limitNum);
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  @Post()
  createTodo(@Body() data: any) {
    this.todos.push(data);
    return this.todos;
  }
}
