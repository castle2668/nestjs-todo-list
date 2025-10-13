import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const timeout = configService.get('AXIOS_TIMEOUT');
        const url = configService.get('API_URL');
        return {
          timeout: parseInt(timeout),
          baseURL: url,
        };
      },
    }),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
