import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Get all product stock levels first (avoids route conflict)
  @Get('stock') // localhost:3100/product/stock
  async getProductStockLevels(): Promise<any[]> {
    return this.productService.getStockLevels();
  }

  // Get all products
  @Get() // localhost:3100/product
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  // Get product by ID or Name
  @Get(':identifier') // localhost:3100/product/:identifier
  async findOne(@Param('identifier') identifier: string): Promise<Product> {
    const parsedId = parseInt(identifier, 10);
    return this.productService.findOne(isNaN(parsedId) ? identifier : parsedId);
  }
}
