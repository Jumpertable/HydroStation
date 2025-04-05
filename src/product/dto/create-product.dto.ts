import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  productName: string;

  @IsString()
  productDes?: string;

  @IsNumber({}, { message: 'Product price must be a number' })
  @IsNotEmpty({ message: 'Product price is required' })
  productPrice: number;

  @IsNumber({}, { message: 'Product stock must be a number' })
  @IsNotEmpty({ message: 'Product stock is required' })
  productStock: number;

  @IsString()
  productBrand: string;
}
