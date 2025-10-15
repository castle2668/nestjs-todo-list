import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPayload } from './models/payload.model';
import { UserPayload } from './decorators/payload.decorator';
import { LocalGuard } from 'src/common/guards';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SigninDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  // 登入 API
  @ApiBody({ type: SigninDto })
  @ApiOkResponse({ description: '登入成功，回傳 JWT' })
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@UserPayload() payload: IUserPayload) {
    return this.jwtService.sign(payload);
  }
}
