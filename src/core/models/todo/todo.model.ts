import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user';
import {
  TODO_TITLE_MIN_LENGTH,
  TODO_TITLE_MAX_LENGTH,
  TODO_DESCRIPTION_MAX_LENGTH,
} from './todo.const';
import { Types } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ versionKey: false, timestamps: true })
export class Todo {
  @Prop({
    minlength: TODO_TITLE_MIN_LENGTH,
    maxlength: TODO_TITLE_MAX_LENGTH,
    required: true,
  })
  title: string;

  @Prop({
    maxlength: TODO_DESCRIPTION_MAX_LENGTH,
  })
  description?: string;

  @Prop({
    required: true,
    default: false,
  })
  completed: boolean;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  assignee: User;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
