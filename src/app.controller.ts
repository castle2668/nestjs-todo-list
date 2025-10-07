import { Controller, Get, Inject, Optional, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { of } from 'rxjs';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTHOR') private readonly author: string,
    @Inject('AUTHOR_MESSAGE') private readonly authorMessage: string,
    @Inject('ALIAS_APP_SERVICE') private readonly aliasAppService: AppService,
    @Inject('CUSTOM_MESSAGE') private readonly customMessage: string,
    @Optional() @Inject('NO_EXIST') private readonly noExist: unknown,
  ) {
    console.log(this.appService === this.aliasAppService); // true
    console.log(this.author); // Sean
    console.log(this.authorMessage); // Sean: Hello World!
    console.log(this.customMessage); // message!
    console.log(this.noExist); // undefined
  }

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
