import { MinLength, MaxLength } from 'class-validator';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(20)
  public readonly username: string;

  @IsEmail()
  public readonly email: string;

  @MinLength(8)
  @MaxLength(32)
  public readonly password: string;
}
