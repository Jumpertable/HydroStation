import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderID, payMethod, payTrans, amount } = createPaymentDto;

    const order = await this.orderModel.findByPk(orderID);
    if (!order) {
      throw new NotFoundException(`Order ID ${orderID} not found`);
    }

    if (order.orderTotal !== amount) {
      throw new BadRequestException(
        `Payment amount (${amount}) must match order total (${order.orderTotal})`,
      );
    }

    const payment = await this.paymentModel.create({
      orderID,
      payMethod,
      payTrans,
      amount,
    });

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.findAll({ include: [Order] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentModel.findByPk(id, {
      include: [Order],
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }
}
