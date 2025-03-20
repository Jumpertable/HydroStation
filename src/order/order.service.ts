import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItems } from 'src/orderitem/entities/orderitem.entity';
import { Product } from 'src/product/entities/product.entity';
@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderModel: typeof Order,
    @InjectModel(OrderItems) private readonly orderItemModel: typeof OrderItems,
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async create(cusID: number, items: { productID: number; amount: number }[]) {
    let total = 0;

    const order = await this.orderModel.create({ cusID, OrderTotal: 0 });

    for (const item of items) {
      const product = await this.productModel.findByPk(item.productID);
      if (!product || product.productStock < item.amount) {
        throw new NotFoundException(
          `Not enough stock for product ID ${item.productID}`,
        );
      }

      const itemTotal = product.productPrice * item.amount;
      total += itemTotal;

      await this.orderItemModel.create({
        OrderID: order.OrderID,
        ProductID: item.productID,
        amount: item.amount,
        ProductPrice: product.productPrice,
      });

      product.productStock -= item.amount;
      await product.save();
    }

    order.OrderTotal = total;
    await order.save();

    return order;
  }

  async findAll() {
    return this.orderModel.findAll({ include: [OrderItems] });
  }

  async findOne(id: number) {
    const order = await this.orderModel.findByPk(id, { include: [OrderItems] });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    await order.destroy();
  }
}
