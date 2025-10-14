import { TodoPriority } from '../types/todo.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    maxLength: 20,
    description: 'The title of the todo',
  })
  public readonly title: string;

  @ApiProperty({
    required: false,
    maxLength: 200,
    description: 'The description of the todo',
  })
  public readonly description?: string;

  @ApiProperty({
    required: false,
    description: 'The completed status of the todo',
  })
  public readonly completed?: boolean;

  @ApiProperty({
    required: false,
    type: [String],
    description: 'The tags of the todo',
  })
  public readonly tags?: string[];

  @ApiProperty({
    enum: TodoPriority,
    enumName: 'TodoPriority',
    description: 'The priority of the todo',
  })
  public readonly priority: TodoPriority;
}
