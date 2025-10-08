import { Injectable } from '@nestjs/common';
import { TodoService } from './modules/todo/todo.service';
import { StorageService } from './modules/storage/storage.service';

@Injectable()
export class AppService {
  constructor(
    private readonly storageService: StorageService,
    private readonly todoService: TodoService,
  ) {
    console.log(AppService.name, Math.random());
  }

  getHello(): string {
    return 'Hello World!';
  }
}
