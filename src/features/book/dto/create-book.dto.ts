import { MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreateBookDto {
  @MinLength(1)
  @MaxLength(20)
  public readonly name: string;

  @MinLength(2)
  @MaxLength(20)
  public readonly author: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(200)
  public readonly description: string;
}
