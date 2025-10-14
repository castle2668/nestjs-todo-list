import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role/role.guard';
import { TodoService } from './todo.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create.todo.dto';

@ApiTags('Todo')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos() {
    return [];
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    return { id };
  }

  @ApiCreatedResponse({
    description: 'The todo has been successfully created.',
  })
  @Post()
  async createTodo(@Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(dto);
  }
}
