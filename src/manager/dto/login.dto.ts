import { IsEmail, IsNotEmpty } from 'class-validator';

export class ManagerLoginDto {
  @IsNotEmpty({ message: 'email required!!' })
  @IsEmail({}, { message: 'This email format is incorrect' })
  businessEmail: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;
}
