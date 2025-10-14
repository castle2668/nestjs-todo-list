import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role/role.guard';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('todos')
export class TodoController {
  @Get()
  async getTodos() {
    return [];
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    return { id };
  }

  @Post()
  async createTodo() {
    return {};
  }
}
