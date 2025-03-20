import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //create Product
  @Post() //localhost:3100/product
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  //Get All Products
  @Get() //localhost:3100/product
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  //Get product by ID and Name
  @Get(':identifier') //localhost:3100/product/:identifier
  async findOne(@Param('identifier') identifier: string): Promise<Product> {
    const parsedId = parseInt(identifier, 10);
    return this.productService.findOne(isNaN(parsedId) ? identifier : parsedId);
  }

  //update a product's data
  @Put('/update/:id') //localhost:3100/product/update/:id
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Product>,
  ): Promise<Product> {
    return this.productService.update(parseInt(id, 10), updateData);
  }

  //obliterate product
  @Delete('/delete/:id') //localhost:3100/product/delete/:id
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(parseInt(id, 10));
  }
}
