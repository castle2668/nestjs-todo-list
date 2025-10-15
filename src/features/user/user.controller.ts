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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 建立使用者
  @ApiCreatedResponse({ description: '建立使用者成功' })
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
  @ApiOkResponse({ description: '查詢使用者列表成功' })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
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
  @ApiOkResponse({ description: '刪除使用者成功' })
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    await this.userService.removeUser(id);
    return { message: 'User deleted successfully' };
  }
}
