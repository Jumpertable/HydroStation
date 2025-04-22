import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Order } from 'src/order/entities/order.entity';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentModel: typeof Payment,
    @InjectModel(Order) private orderModel: typeof Order,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { cusID, payMethod, orderID } = createPaymentDto;

    // 1. Fetch all orders including payment info
    const allOrders = await this.orderModel.findAll({
      include: [Payment],
    });

    // 2. Filter manually to get unpaid orders
    const unpaidOrders = allOrders.filter((order) => {
      return (
        order.payID === null &&
        (orderID ? order.orderID === orderID : order.cusID === cusID)
      );
    });

    if (unpaidOrders.length === 0) {
      throw new BadRequestException(
        'No unpaid orders found for this customer.',
      );
    }

    // Debug log
    console.log(
      'Unpaid Orders:',
      unpaidOrders.map((o) => ({
        orderID: o.orderID,
        orderTotal: o.orderTotal,
        payID: o.payID,
      })),
    );

    // 3. Calculate total amount
    const totalAmount = unpaidOrders.reduce(
      (sum, order) => sum + (order.orderTotal || 0),
      0,
    );

    // 4. Create payment
    const payment = await this.paymentModel.create({
      cusID,
      amount: totalAmount,
      payMethod,
      payTrans: uuidv4(),
      payStatus: 'Paid',
    } as any);

    // 5. Assign and delete each order
    for (const order of unpaidOrders) {
      order.payID = payment.payID;
      await order.save();
      await order.destroy();
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
}
