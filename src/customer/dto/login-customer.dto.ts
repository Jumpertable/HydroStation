import { IsEmail, IsString } from 'class-validator';

export class LoginCustomerDto {
  @IsEmail()
  cusEmail: string;

  @IsString()
  password: string;
}
