import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class RegisterCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cusName?: string;

  @IsEmail()
  cusEmail?: string;

  @IsOptional()
  @IsNotEmpty()
  cusPhone?: number;

  @IsOptional()
  @IsString()
  cusAddr?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
