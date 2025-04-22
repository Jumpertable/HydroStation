import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsOptional()
  @IsNumber()
  payAmount?: number;

  @IsOptional()
  @IsString()
  payMethod?: string;
}
