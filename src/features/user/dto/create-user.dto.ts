import { MinLength, MaxLength } from 'class-validator';
import { IsEmail } from 'class-validator';
import {
  Role,
  USER_PASSWORD_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_MAX_LENGTH,
} from '../../../core/models/user';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    minLength: USER_USERNAME_MIN_LENGTH,
    maxLength: USER_USERNAME_MAX_LENGTH,
    description: 'Username',
  })
  @MinLength(USER_USERNAME_MIN_LENGTH)
  @MaxLength(USER_USERNAME_MAX_LENGTH)
  public readonly username: string;

  @ApiProperty({
    minLength: USER_PASSWORD_MIN_LENGTH,
    maxLength: USER_PASSWORD_MAX_LENGTH,
    description: 'Password',
  })
  @MinLength(USER_PASSWORD_MIN_LENGTH)
  @MaxLength(USER_PASSWORD_MAX_LENGTH)
  public readonly password: string;

  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    enum: Role,
    enumName: 'RoleType',
    description: 'Role',
  })
  @IsEnum(Role)
  public readonly role: Role;
}
