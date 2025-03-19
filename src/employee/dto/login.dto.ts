import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmployeeLoginDto {
  @IsNotEmpty({ message: 'business email required!!' })
  @IsEmail({}, { message: 'This email format is incorrect' })
  businessEmail: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;

  @IsNotEmpty({ message: 'manager code required!!' })
  manager_code: string;
}
