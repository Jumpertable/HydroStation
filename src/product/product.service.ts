import { Injectable, NotFoundException } from '@nestjs/common';
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
          productName: identifier,
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
      stockLimit: product.stockLimit,
      stockStatus:
        product.stockLimit !== null && product.stockLimit !== undefined
          ? product.productStock <= product.stockLimit
            ? 'Low'
            : 'Sufficient'
          : product.productStock <= 50
            ? 'Low'
            : product.productStock <= 100
              ? 'Warning'
              : 'Sufficient',
    };
  }

  async getStockLevels(): Promise<any[]> {
    const products = await this.productModel.findAll({
      attributes: ['productID', 'productName', 'productStock', 'stockLimit'],
    });

    return products.map((product) => {
      const stockStatus =
        product.stockLimit !== null && product.stockLimit !== undefined
          ? product.productStock <= product.stockLimit
            ? 'Low'
            : 'Sufficient'
          : product.productStock <= 50
            ? 'Low'
            : product.productStock <= 100
              ? 'Warning'
              : 'Sufficient';

      return {
        productID: product.productID,
        productName: product.productName,
        productStock: product.productStock,
        stockLimit: product.stockLimit,
        stockStatus,
      };
    });
  }

  async updateProduct(id: number, dto: Partial<Product>) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Update the product
    await product.update(dto);

    // Refresh product to updated
    await product.reload();

    const stockStatus =
      product.stockLimit !== null && product.stockLimit !== undefined
        ? product.productStock <= product.stockLimit
          ? 'Low'
          : 'Sufficient'
        : product.productStock <= 50
          ? 'Low'
          : product.productStock <= 100
            ? 'Warning'
            : 'Sufficient';

    return {
      message: 'Product updated successfully',
      product: {
        productID: product.productID,
        productName: product.productName,
        productStock: product.productStock,
        stockStatus,
        stockLimit: product.stockLimit,
      },
    };
  }
}
