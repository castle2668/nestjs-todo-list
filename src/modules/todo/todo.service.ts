import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class TodoService {
  constructor(private readonly storageService: StorageService) {
    console.log(TodoService.name, Math.random());
  }
}
