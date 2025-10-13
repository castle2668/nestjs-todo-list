import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TodoService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public createTodo(dto: any) {
    // 送資料給其他服務
    this.eventEmitter.emit('todo.created', dto);
    // 回傳資料
    return dto;
  }
}
