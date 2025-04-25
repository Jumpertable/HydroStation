import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // product stock
  @Get('stock') // localhost:3100/product/stock
  async getProductStockLevels(): Promise<any[]> {
    return this.productService.getStockLevels();
  }

  // Get all products

  // Get product by ID or Name
  @Get(':identifier') // localhost:3100/product/:identifier
  async findOne(@Param('identifier') identifier: string): Promise<Product> {
    const parsedId = parseInt(identifier, 10);
    return this.productService.findOne(isNaN(parsedId) ? identifier : parsedId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: Partial<Product>, // or UpdateProductDto
  ) {
    return this.productService.updateProduct(+id, dto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
