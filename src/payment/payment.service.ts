import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment,
  ) {}

  async create(orderID: number, amount: number, method: string) {
    return await this.paymentModel.create({ orderID, amount, method });
  }

  async findAll() {
    return await this.paymentModel.findAll();
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment)
      throw new NotFoundException(`Payment with ID ${id} not found`);
    return payment;
  }

  async findByOrder(orderID: number) {
    return await this.paymentModel.findAll({ where: { orderID } });
  }

  async update(
    id: number,
    updateData: Partial<{ amount: number; method: string }>,
  ) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    await payment.update(updateData);
    return payment;
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: `Payment with ID ${id} deleted successfully` };
  }
}
