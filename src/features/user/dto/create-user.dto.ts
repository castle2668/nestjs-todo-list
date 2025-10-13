export class CreateUserDto {
  public readonly name: {
    firstName: string;
    lastName: string;
  };

  public readonly email: string;
}
