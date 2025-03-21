import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  productName?: string;

  @IsString()
  @IsOptional()
  productDes?: string;

  @IsNumber({}, { message: 'Product price must be a number' })
  productPrice?: number;

  @IsNumber({}, { message: 'Product stock must be a number' })
  productStock?: number;

  @IsString()
  @IsOptional()
  productBrand?: string;
}
