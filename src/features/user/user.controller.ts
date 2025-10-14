import {
  Body,
  ConflictException,
  Controller,
  Get,
  Query,
  Post,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtGuard, RoleGuard } from '../../common/guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 建立使用者
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const exist = await this.userService.existUser(username, email);
    // 如果使用者已存在，則拋出衝突錯誤
    if (exist) {
      throw new ConflictException('User already exists');
    }
    // 建立使用者
    const document = await this.userService.createUser(dto);
    const user = document.toJSON();
    // 移除密碼
    user.password = null;

    // 回傳資料
    return user;
  }

  // 查詢使用者列表
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  async getUsers(@Query() skip: number, @Query() limit: number) {
    const document = await this.userService.getUsers(skip, limit);
    const users = document.map((document) => {
      const user = document.toJSON();
      user.password = null;
      return user;
    });
    return users;
  }

  // 刪除使用者
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    await this.userService.removeUser(id);
    return { message: 'User deleted successfully' };
  }
}
