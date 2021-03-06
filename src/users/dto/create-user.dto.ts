export class CreateUserDto {
  readonly id: number;
  readonly username: string;

  readonly name: string;
  readonly imageUrl: string;
  readonly email: string;
  readonly phone: string;

  // Do not store or share plaintext password!
  readonly password: string;
}
