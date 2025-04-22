import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from 'src/order/entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { cusID, amount, payMethod, payTrans } = createPaymentDto;

    // 1. Find all unpaid orders
    const unpaidOrders = await this.orderModel.findAll({
      where: {
        cusID,
        payID: null,
      },
    } as any);

    if (unpaidOrders.length === 0) {
      throw new BadRequestException(
        'No unpaid orders found for this customer.',
      );
    }

    // 2. Calculate total due
    const totalDue = unpaidOrders.reduce(
      (sum, order) => sum + (order.orderTotal || 0),
      0,
    );

    // 3. Validate customer provided enough payment
    if (amount < totalDue) {
      throw new BadRequestException(
        `Payment amount (${amount}) does not cover total due (${totalDue}).`,
      );
    }

    // 4. Create payment
    const payment = await this.paymentModel.create({
      cusID,
      amount,
      payMethod,
      payTrans: payTrans || uuidv4(),
      payStatus: 'Paid',
    } as any);

    // 5. Assign orders to payment
    for (const order of unpaidOrders) {
      order.payID = payment.payID;
      await order.save();
    }

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

  async getTotalUnpaidAmountForCustomer(cusID: number): Promise<number> {
    const unpaidOrders = await this.orderModel.findAll({
      where: {
        cusID,
        payID: null,
      },
    } as any);

    return unpaidOrders.reduce(
      (sum, order) => sum + (order.orderTotal || 0),
      0,
    );
  }
}
