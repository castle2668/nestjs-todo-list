import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const { username, email } = dto;
    const isExists = await this.userService.userExists(username, email);

    if (isExists) {
      throw new ForbiddenException('Username or email already exists');
    }

    const user = await this.userService.createUser(dto);
    return user.toJSON();
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Request() request: any) {
    return request.user;
  }
}
