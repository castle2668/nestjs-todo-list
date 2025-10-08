import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
