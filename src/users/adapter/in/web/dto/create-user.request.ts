import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
