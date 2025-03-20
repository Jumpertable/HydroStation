import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';

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
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateData: Partial<Customer>): Promise<Customer> {
    const [affectedCount] = await this.customerModel.update(updateData, {
      where: { cusID: id },
    });

    if (affectedCount === 0) {
      throw new Error(`Customer with ID ${id} not found`);
    }

    return this.findOne(id); // Fetch the updated entity
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
