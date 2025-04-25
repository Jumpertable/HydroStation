// payment.service.ts
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

  async create(createPaymentDto: CreatePaymentDto) {
    const { cusID, amount, payMethod, payTrans } = createPaymentDto;

    console.log('🔍 Checking unpaid orders for cusID:', cusID);

    const unpaidOrders = await this.orderModel.findAll({
      where: { cusID, payID: null },
    } as any);

    console.log('🧾 Unpaid orders:', unpaidOrders);

    if (unpaidOrders.length === 0) {
      throw new BadRequestException(
        '❌ No unpaid orders found for this customer.',
      );
    }

    const totalDue = unpaidOrders.reduce(
      (sum, order) => sum + (order.orderTotal || 0),
      0,
    );

    console.log(`💰 Total due: ${totalDue}, amount provided: ${amount}`);

    if (amount < totalDue) {
      throw new BadRequestException(
        `❌ Payment amount (${amount}) does not cover total due (${totalDue}).`,
      );
    }

    const payment = await this.paymentModel.create({
      cusID,
      amount,
      payMethod,
      payTrans: payTrans || uuidv4(),
      payStatus: 'Paid',
    } as any);

    for (const order of unpaidOrders) {
      order.payID = payment.payID;
      await order.save();
    }

    return {
      message: '✅ Payment completed successfully!',
      payment: {
        payID: payment.payID,
        cusID: payment.cusID,
        amount: payment.amount,
        payMethod: payment.payMethod,
        payTrans: payment.payTrans,
        payStatus: payment.payStatus,
        createdAt: payment.createdAt,
      },
      receipt: unpaidOrders.map((order) => ({
        orderID: order.orderID,
        total: order.orderTotal,
      })),
    };
  }

  async findAll() {
    return this.paymentModel.findAll({ include: [Order] });
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: [Order],
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async getTotalUnpaidAmountForCustomer(cusID: number) {
    const unpaidOrders = await this.orderModel.findAll({
      where: { cusID, payID: null },
    } as any);

    return unpaidOrders.reduce(
      (sum, order) => sum + (order.orderTotal || 0),
      0,
    );
  }
}
