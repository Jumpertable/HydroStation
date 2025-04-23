import { IsEmail, IsNotEmpty } from 'class-validator';

export class ManagerLoginDto {
  @IsNotEmpty({ message: 'business email required!!' })
  @IsEmail({}, { message: 'This business email format is incorrect' })
  businessEmail: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;
}
