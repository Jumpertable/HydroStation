import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    return this.productModel.create(productData);
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

  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    const [affectedRows] = await this.productModel.update(updateData, {
      where: { productID: id },
    });

    if (affectedRows == 0) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedRows = await this.productModel.destroy({
      where: { productID: id },
    });

    if (deletedRows === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }
  }
}
