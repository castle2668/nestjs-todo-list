import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorageModule } from './modules/storage/storage.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [StorageModule, TodoModule],
})
export class AppModule {}
