export class CreateUserDto {
  readonly id: number;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly imageUrl: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
}
