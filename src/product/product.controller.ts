import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //create Product
  @Post() //localhost:3100/product
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
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
  @Put('/update/:productID') //localhost:3100/product/update/:id
  async update(
    @Param('productID', ParseIntPipe) productID: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productID, updateProductDto);
  }

  //obliterate product
  @Delete('/delete/:productID') //localhost:3100/product/delete/:id
  async remove(@Param('productID') productID: string): Promise<void> {
    return this.productService.remove(parseInt(productID, 10));
  }
}
