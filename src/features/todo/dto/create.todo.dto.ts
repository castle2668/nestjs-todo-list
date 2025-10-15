import {
  TODO_TITLE_MAX_LENGTH,
  TODO_TITLE_MIN_LENGTH,
} from '../../../core/models/todo/todo.const';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { TODO_DESCRIPTION_MAX_LENGTH } from '../../../core/models/todo/todo.const';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    minLength: TODO_TITLE_MIN_LENGTH,
    maxLength: TODO_TITLE_MAX_LENGTH,
    description: 'Title',
  })
  @MinLength(TODO_TITLE_MIN_LENGTH)
  @MaxLength(TODO_TITLE_MAX_LENGTH)
  public readonly title: string;

  @ApiProperty({
    maxLength: TODO_DESCRIPTION_MAX_LENGTH,
    required: false,
    description: 'Description',
  })
  @IsOptional()
  @MaxLength(TODO_DESCRIPTION_MAX_LENGTH)
  public readonly description?: string;

  @ApiProperty({
    required: false,
    description: 'Completed',
  })
  @IsOptional()
  @IsBoolean()
  public readonly completed?: boolean;

  @ApiProperty({
    description: 'Assignee User ID',
  })
  @IsNotEmpty()
  public readonly assignee: string;
}
