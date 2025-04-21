import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

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
}
