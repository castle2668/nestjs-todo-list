import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const document = await this.userService.createUser(dto);
    return document.toJSON();
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const document = await this.userService.updateUser(id, dto);
    return document.toJSON();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const document = await this.userService.getUser(id);
    return document.toJSON();
  }

  @Get()
  async getUsers(
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', ParseIntPipe) skip: number,
  ) {
    const documents = await this.userService.getUsers(skip, limit);
    return documents.map((doc) => doc.toJSON());
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const document = await this.userService.removeUser(id);
    return document.toJSON();
  }
}
