import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpFilter<T extends HttpException> implements ExceptionFilter<T> {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = exception.getStatus();
    // const message = exception.getResponse();
    const message = (() => {
      const res = exception.getResponse();
      if (typeof res === 'string') {
        return res;
      }
      return (res as any).message;
    })();
    const timestamp = new Date().toISOString();
    response.status(code).json({ code, message, timestamp });
  }
}
