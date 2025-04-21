import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(customerData: Partial<Customer>): Promise<Customer> {
    return this.customerModel.create(customerData);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async getCustomerWithOrders(cusID: number) {
    const customer = await this.customerModel.findOne({
      where: { cusID },
      include: [{ model: Order, required: false }],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${cusID} not found`);
    }

    return customer;
  }

  async update(
    cusID: number,
    updateData: UpdateCustomerDto,
  ): Promise<Customer> {
    console.log(`Looking for customer with ID: ${cusID}`);

    const customer = await this.customerModel.findOne({
      where: { cusID },
    });

    console.log('Customer found:', customer);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${cusID} not found`);
    }

    return await customer.update(updateData);
  }

  async remove(id: number): Promise<void> {
    const affectedRows = await this.customerModel.destroy({
      where: { cusID: id },
    });

    if (affectedRows === 0) {
      throw new Error(`Customer with ID ${id} not found`);
    }
  }
}
