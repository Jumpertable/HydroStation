import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItems } from './entities/orderitem.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItems)
    private readonly orderItemsModel: typeof OrderItems,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async create(orderID: number, productID: number, amount: number) {
    const product = await this.productModel.findByPk(productID);
    if (!product || product.productStock < amount) {
      throw new NotFoundException(
        `Not enough stock for product ID ${productID}`,
      );
    }

    const order = await this.orderModel.findByPk(orderID);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderID} not found`);
    }

    const itemTotal = product.productPrice * amount;

    const orderItem = await this.orderItemsModel.create({
      orderID,
      productID,
      amount,
      productPrice: product.productPrice,
    });

    // Reduce product stock
    product.productStock -= amount;
    await product.save();

    return orderItem;
  }

  async findAll() {
    return this.orderItemsModel.findAll({ include: [Order, Product] });
  }

  async findOne(orderItemID: number) {
    const orderItem = await this.orderItemsModel.findByPk(orderItemID, {
      include: [Order, Product],
    });
    if (!orderItem) {
      throw new NotFoundException(
        `Order item with ID ${orderItemID} not found`,
      );
    }
    return orderItem;
  }

  async remove(orderItemID: number) {
    const orderItem = await this.findOne(orderItemID);
    await orderItem.destroy();
  }
}
