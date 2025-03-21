import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  cusName?: string;

  @IsEmail()
  cusEmail?: string;

  @IsOptional()
  cusPhone?: string;

  @IsOptional()
  @IsString()
  cusAddr?: string;
}
