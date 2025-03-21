import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
    @InjectModel(Order) private readonly orderModel: typeof Order,
  ) {}

  async processPayment(
    orderID: number,
    amount: number,
    method: string,
  ): Promise<Payment> {
    const order = await this.orderModel.findByPk(orderID);
    if (!order)
      throw new NotFoundException(`Order with ID ${orderID} not found`);

    const payment = await this.paymentModel.create({
      OrderID: orderID,
      amountPaid: amount,
      paymentMethod: method,
      paymentStatus: 'Completed',
    });

    return payment;
  }

  async findByOrder(orderID: number): Promise<Payment[]> {
    return this.paymentModel.findAll({ where: { OrderID: orderID } });
  }
}
