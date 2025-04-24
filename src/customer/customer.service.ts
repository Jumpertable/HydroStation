import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './entities/customer.entity';
import { RegisterCustomerDto } from './dto/Register-customer.dto';
import { Order } from 'src/order/entities/order.entity';
import * as bcrypt from 'bcrypt';
import { LoginCustomerDto } from './dto/login-customer.dto';

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
    updateData: RegisterCustomerDto,
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

  async register(dto: RegisterCustomerDto) {
    const hashedPassword = await bcrypt.hash(dto.password as string, 10);
    return this.customerModel.create({
      cusName: dto.cusName,
      cusEmail: dto.cusEmail,
      password: hashedPassword,
    });
  }

  async login(dto: LoginCustomerDto) {
    const customer = await this.customerModel.findOne({
      where: { cusEmail: dto.cusEmail },
    });

    console.log('👉 DTO password:', dto.password);
    console.log('🔐 Stored hash:', customer?.password); // Use optional chaining in case customer is null

    if (!customer || !(await bcrypt.compare(dto.password, customer.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      message: 'Login successful',
      cusID: customer.cusID,
      cusName: customer.cusName,
    };
  }
}
