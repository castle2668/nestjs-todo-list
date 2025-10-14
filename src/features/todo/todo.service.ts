import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create.todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Todo, TodoDocument } from '../../core/models/todo';
import { UpdateTodoDto } from './dto/update.todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>,
  ) {}

  // 建立待辦事項
  public async createTodo(dto: CreateTodoDto) {
    const document = await this.todoModel.create(dto);
    return document.populate('assignee', '-password'); // 排除密碼欄位
  }

  // 查詢待辦事項列表
  public getTodos(skip = 0, limit = 30, filters?: FilterQuery<TodoDocument>) {
    const query = this.todoModel
      .find(filters)
      .populate('assignee', '-password') // 排除密碼欄位
      .skip(skip)
      .limit(limit);
    return query.exec();
  }

  // 查詢待辦事項
  public getTodoById(id: string) {
    return this.todoModel
      .findById(id)
      .populate('assignee', '-password') // 排除密碼欄位
      .exec();
  }

  // 更新待辦事項
  public updateTodo(id: string, dto: UpdateTodoDto) {
    return this.todoModel
      .findByIdAndUpdate(id, { $set: dto }, { new: true })
      .populate('assignee', '-password') // 排除密碼欄位
      .exec();
  }

  // 刪除待辦事項
  public removeTodo(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
