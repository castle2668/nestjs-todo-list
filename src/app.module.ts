import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AppService } from './app.service';
import { HelloMiddleware } from './middlewares/hello/hello.middleware';
import { TodoModule } from './features/todo/todo.module';
import { RequestMethod } from '@nestjs/common';

@Module({
  imports: [TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(HelloMiddleware)
      .exclude({ path: 'todos', method: RequestMethod.POST })
      .forRoutes('todos'); // 排除 todos 路徑的 POST 方法
  }
}
