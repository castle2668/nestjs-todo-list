import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './models/payload.model';
import { UserPayload } from './decorators/payload.decorator';
import { LocalGuard } from 'src/common/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  // 登入 API
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    return this.jwtService.sign(payload);
  }
}
