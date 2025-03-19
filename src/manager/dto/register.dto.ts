import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ManagerRegisterDto {
  @IsNotEmpty({ message: 'first name required!!' })
  first_name: string;

  @IsNotEmpty({ message: 'last name required!!' })
  last_name: string;

  @IsNotEmpty({ message: 'business email required!!' })
  @MaxLength(255)
  @IsEmail({}, { message: 'The email format is incorrect.' })
  businessEmail: string;

  @IsString()
  @MaxLength(255) // Adjust as needed
  companyAddress: string;

  @IsNotEmpty({ message: 'password required!!' })
  password: string;
}
