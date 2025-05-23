import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmployeeRegisterDto {
  @IsNotEmpty({ message: 'first name required!!' })
  first_name: string;

  @IsNotEmpty({ message: 'last name required!!' })
  last_name: string;

  @IsNotEmpty({ message: 'business email required!!' })
  @IsEmail({}, { message: 'The email format is incorrect.' })
  businessEmail: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;

  @IsNotEmpty({ message: 'Who do you belong to?!!' })
  manager_id: number;
}
