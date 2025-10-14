import { Body, Controller, Param, Patch, Post, Delete } from '@nestjs/common';
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

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    const document = await this.userService.removeUser(id);
    return document.toJSON();
  }
}
