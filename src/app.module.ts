import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './features/todo/todo.controller';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { CommonModule } from './modules/common/common.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [TodoModule, CopyTodoModule, CommonModule, MessageModule],
  controllers: [AppController, TodoController],
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: 'AUTHOR',
      useValue: 'Sean',
    },
    {
      provide: 'AUTHOR_MESSAGE',
      inject: [AppService],
      useFactory: (appService: AppService) => {
        const hello = appService.getHello();
        return `Sean: ${hello}`;
      },
    },
    {
      provide: 'ALIAS_APP_SERVICE',
      useExisting: AppService,
    },
  ],
})
export class AppModule {}
