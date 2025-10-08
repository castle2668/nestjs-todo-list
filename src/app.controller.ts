import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorators/user/user.decorator';
import { Authorization } from './decorators/authorization/authorization.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Authorization('admin', 'staff')
  @Get()
  getHello(@User('name') user: any): string {
    return user;
  }
}
