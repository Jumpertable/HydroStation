import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { Op } from 'sequelize';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(identifier: number | string): Promise<any> {
    let product: Product | null;

    if (typeof identifier === 'number') {
      product = await this.productModel.findByPk(identifier);
      if (!product) {
        throw new Error(`No product found with the ID: ${identifier}`);
      }
    } else {
      product = await this.productModel.findOne({
        where: {
          productName: {
            [Op.iLike]: identifier,
          },
        },
      });
      if (!product) {
        throw new Error(`Where's my "${identifier}"?!?`);
      }
    }

    return {
      productID: product.productID,
      productName: product.productName,
      productStock: product.productStock,
      stockStatus:
        product.productStock <= 50
          ? 'Low'
          : product.productStock <= 100
            ? 'Warning'
            : 'Sufficient',
    };
  }

  async getStockLevels(): Promise<any[]> {
    const products = await this.productModel.findAll({
      attributes: ['productID', 'productName', 'productStock'],
    });

    return products.map((product) => ({
      ...product.get(),
      stockStatus:
        product.productStock <= 50
          ? 'Low'
          : product.productStock <= 100
            ? 'Warning'
            : 'Sufficient',
    }));
  }
}
