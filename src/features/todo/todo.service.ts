import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: any[] = [];

  public addTodo(data: any) {
    this.todos.push(data);
  }

  public getTodos() {
    return this.todos;
  }

  public getTodo(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }
}
