import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ description: 'Username' })
  public readonly username: string;

  @ApiProperty({ description: 'Password' })
  public readonly password: string;
}
