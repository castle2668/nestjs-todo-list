import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Body,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from '../../common/guards';
import { RoleGuard } from '../../common/guards';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create.todo.dto';
import { UpdateTodoDto } from './dto/update.todo.dto';

@UseGuards(JwtGuard, RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 建立待辦事項
  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    const todo = await this.todoService.createTodo(dto);
    return todo.toJSON();
  }

  // 查詢待辦事項列表
  @Get()
  async getTodos(@Query() skip: number, @Query() limit: number) {
    const documents = await this.todoService.getTodos(skip, limit);
    const todos = documents.map((document) => document.toJSON());
    return todos;
  }

  // 查詢待辦事項
  @Get(':id')
  async getTodo(@Param('id') id: string) {
    const todo = await this.todoService.getTodoById(id);
    return todo ? todo.toJSON() : {};
  }

  // 更新待辦事項
  @Patch(':id')
  async updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todoService.updateTodo(id, dto);
    return todo.toJSON();
  }

  // 刪除待辦事項
  @Delete(':id')
  async removeTodo(@Param('id') id: string) {
    await this.todoService.removeTodo(id);
    return { message: 'Todo deleted successfully' };
  }
}
