import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ManagerRegisterDto {
  @IsNotEmpty({ message: 'first name required!!' })
  first_name: string;

  @IsNotEmpty({ message: 'last name required!!' })
  last_name: string;

  @IsNotEmpty({ message: 'business email required!!' })
  @IsEmail({}, { message: 'The email format is incorrect.' })
  businessEmail: string;

  @IsString()
  companyAddress: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;
}
