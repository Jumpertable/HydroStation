import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productModel.create({ ...createProductDto });
    } catch (error) {
      throw new BadRequestException('Invalid product data: ' + error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(identifier: number | string): Promise<Product> {
    let product: Product | null;

    if (typeof identifier === 'number') {
      product = await this.productModel.findByPk(identifier);
      if (!product) {
        throw new Error(`No product found with the ID: ${identifier}`);
      }
    } else {
      product = await this.productModel.findOne({
        where: { productName: identifier },
      });
      if (!product) {
        throw new Error(`Where's my "${identifier}"?!?`);
      }
    }

    return product;
  }

  async update(
    productID: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findOne({
      where: { productID },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productID} not found`);
    }
    return product.update(updateProductDto);
  }

  async remove(productID: number): Promise<void> {
    const deletedRows = await this.productModel.destroy({
      where: { productID: productID },
    });

    if (deletedRows === 0) {
      throw new Error(`Product with ID ${productID} not found`);
    }
  }
}
