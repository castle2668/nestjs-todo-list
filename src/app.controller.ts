import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { of } from 'rxjs';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('async')
  testPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }

  @Get('rxjs')
  testRxjs() {
    return of([]);
  }

  @Get('libraryMode')
  testLibraryMode(@Res() res: Response) {
    res.status(200).json({
      message: 'Hello World',
    });
  }
}
