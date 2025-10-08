import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MockDataMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.role = 'staff';
    req.user = {
      name: 'Sean',
    };
    next();
  }
}
