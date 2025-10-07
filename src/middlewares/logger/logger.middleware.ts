import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const method = req.method.toUpperCase();
    const resource = req.originalUrl;
    const timestamp = new Date().toISOString();
    console.log(`[${method}] ${resource} - ${timestamp}`);
    next();
  }
}
