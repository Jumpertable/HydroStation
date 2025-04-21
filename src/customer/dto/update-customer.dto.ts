import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cusName?: string;

  @IsEmail()
  cusEmail?: string;

  @IsOptional()
  @IsNotEmpty()
  cusPhone?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cusAddr?: string;
}
