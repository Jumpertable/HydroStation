import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ManagerLoginDto {
  @IsNotEmpty({ message: 'business email required!!' })
  @IsEmail({}, { message: 'This business email format is incorrect' })
  @MaxLength(255)
  businessEmail: string;

  @IsNotEmpty({ message: 'password required!!' })
  @MaxLength(255)
  password: string;
}
