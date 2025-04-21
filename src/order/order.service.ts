import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Payment } from 'src/payment/entities/payment.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { cusID, items } = createOrderDto;

    if (!cusID || !items || !Array.isArray(items)) {
      throw new Error('Missing or invalid order data');
    }

    let orderTotal = 0;
    const productsMap = new Map<number, Product>();

    // Validate and prepare product data
    for (const item of items) {
      const product = await this.productModel.findByPk(item.productID);

      if (!product) {
        throw new Error(`Product with ID ${item.productID} not found`);
      }

      if (product.productStock < item.amount) {
        throw new Error(`Not enough stock for ${product.productName}`);
      }

      if (typeof product.productPrice !== 'number') {
        throw new Error(`Invalid price for product ID ${product.productID}`);
      }

      orderTotal += product.productPrice * item.amount;
      productsMap.set(item.productID, product);
    }

    console.log('cusID:', cusID);
    console.log('Final orderTotal:', orderTotal);

    //Create the order
    const order = await this.orderModel.create();

    for (const item of items) {
      const product = productsMap.get(item.productID)!;

      product.productStock -= item.amount;
      await product.save();

      await this.orderItemModel.create({
        orderID: order.orderID,
        productID: product.productID,
        amount: item.amount,
        productPrice: product.productPrice,
      });
    }

    return order;
  }

  //order/cus/:cusID
  async findByCusId(cusID: number): Promise<any[]> {
    const orders = await this.orderModel.findAll({
      where: { cusID },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [Product],
        },
        {
          model: Payment,
        },
      ],
    });

    // ✅ Transform and add "paymentStatus"
    return orders.map((order) => {
      const plain = order.get({ plain: true });
      return {
        ...plain,
        paymentStatus: plain.payment ? 'Paid' : 'Unpaid',
      };
    });
  }
}
