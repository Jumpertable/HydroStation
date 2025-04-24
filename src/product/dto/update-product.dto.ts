import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  productName?: string;

  @IsString()
  @IsOptional()
  productDes?: string;

  @IsNumber({}, { message: 'Product price must be a number' })
  @IsOptional()
  productPrice?: number;

  @IsNumber({}, { message: 'Product stock must be a number' })
  @IsOptional()
  productStock?: number;

  @IsString()
  @IsOptional()
  productBrand?: string;

  @IsNumber({}, { message: 'Product stock must be a number' })
  @IsOptional()
  stockLimit?: number;

  @IsString()
  image_url: string;
}
