import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TodoListener {
  constructor(private readonly httpService: HttpService) {}

  @OnEvent('todo.created')
  onTodoCreated(event: any) {
    const data = {
      name: 'todo.created',
      timestamp: new Date().toISOString(),
      payload: event,
    };
    this.httpService
      .post('http://localhost:5007/webhook/todos', data)
      .subscribe({
        next: (response) => {
          console.log('Todo created response:', response);
        },
        error: (error) => {
          console.log('Todo created error:', error);
        },
      });
  }
}
