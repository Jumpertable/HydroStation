import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Manager } from './entities/manager.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { ManagerRegisterDto } from './dto/register.dto';
import { ManagerLoginDto } from './dto/login.dto';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { Employee } from 'src/employee/entities/employee.entity';
import * as crypto from 'crypto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager) private managerModel: typeof Manager,
    @InjectModel(Employee) private employeeModel: typeof Employee,
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderItem) private orderItemModel: typeof OrderItem,
  ) {}

  async create(managerRegisterDto: ManagerRegisterDto) {
    // Validate password before hashing (ensure it's not empty or invalid)
    if (
      !managerRegisterDto.password ||
      managerRegisterDto.password.length < 6
    ) {
      throw new BadRequestException(
        'Password is required and must be at least 6 characters long',
      );
    }

    // Validate other fields
    if (!managerRegisterDto.first_name || !managerRegisterDto.last_name) {
      throw new BadRequestException('First name and Last name are required');
    }

    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(managerRegisterDto.password, salt);

    try {
      // Create the manager record
      const manager = await this.managerModel.create({
        ...managerRegisterDto,
        password: hashedPassword, // Use the hashed password
      });

      // Return relevant manager data, omitting sensitive fields like password
      return {
        message: 'Manager successfully registered',
        manager_id: manager.manager_id,
        first_name: manager.first_name,
        last_name: manager.last_name,
        businessEmail: manager.businessEmail,
        companyAddress: manager.companyAddress,
      };
    } catch (error) {
      // Handle errors more specifically
      if (error.name === 'SequelizeUniqueConstraintError') {
        // If email is already registered, handle it specifically
        console.error('Email already exists:', error.message);
        throw new BadRequestException('Email already registered');
      }

      // General error handling if it's not a unique constraint issue
      console.error(
        'Error during manager creation:',
        error.message,
        error.stack,
      );
      throw new BadRequestException('Failed to register manager');
    }
  }

  async login(dto: ManagerLoginDto) {
    const manager = await this.managerModel.findOne({
      where: { businessEmail: dto.businessEmail },
    });

    if (!manager) throw new UnauthorizedException('Invalid credentials');
    const valid = await compare(dto.password, manager.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return {
      message: 'Login successful',
      managerID: manager.manager_id,
      email: manager.businessEmail,
    };
  }

  async findAll() {
    return await this.managerModel.findAll();
  }

  async findOne(manager_id: number) {
    const manager = await this.managerModel.findByPk(manager_id);
    if (!manager) {
      throw new BadRequestException(`Manager with id ${manager_id} not found`);
    }
    return manager;
  }

  async update(manager_id: number, dto: ManagerRegisterDto) {
    const manager = await this.findOne(manager_id);

    const salt = await genSalt(10);
    const hashed = await hash(dto.password, salt);

    return await manager.update({
      ...dto,
      password: hashed,
    });
  }

  async remove(manager_id: number) {
    return await this.managerModel.destroy({ where: { id: manager_id } });
  }

  //employees

  async createEmployee(dto: EmployeeRegisterDto, managerId: number) {
    const passcode = crypto.randomBytes(3).toString('hex');

    const salt = await genSalt(10);
    const hashed = await hash(dto.password, salt);

    const newEmp = await this.employeeModel.create({
      ...dto,
      manager_id: managerId,
      password: hashed,
      manager_code: passcode,
    });

    return {
      message: 'Employee created',
      employeeID: newEmp.employeeID,
      email: newEmp.businessEmail,
      passcode,
    };
  }

  async updateEmployee(
    id: number,
    dto: EmployeeRegisterDto,
  ): Promise<{ message: string; employeeID: any }> {
    const employee = await this.employeeModel.findByPk(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const updateData = { ...dto };

    if (dto.password) {
      updateData.password = await hash(dto.password, 10);
    }

    await employee.update(updateData);

    return {
      message: 'Employee updated successfully',
      employeeID: employee.employeeID,
    };
  }

  async getEmployeesUnderManager(manager_id: number) {
    console.log('Check for employees under manager ID:', manager_id);
    const employees = await this.employeeModel.findAll({
      where: { manager_id },
      attributes: { exclude: ['password', 'manager_code'] },
    });
    console.log('🧾 Found employees:', employees);
    return employees;
  }

  async removeEmployee(employeeID: number): Promise<{ message: string }> {
    const employee = await this.employeeModel.findByPk(employeeID);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeID} not found`);
    }

    await employee.destroy();
    return {
      message: `Employee with ID ${employeeID} has been removed. Goodbye ${employee.first_name}`,
    };
  }

  //products

  async addProduct(dto: CreateProductDto) {
    return await this.productModel.create(dto as any);
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await product.update(dto);

    await product.reload();

    const stockStatus =
      product.stockLimit !== null && product.stockLimit !== undefined
        ? product.productStock <= product.stockLimit
          ? 'Low'
          : 'Sufficient'
        : product.productStock <= 50
          ? 'Low'
          : product.productStock <= 100
            ? 'Warning'
            : 'Sufficient';

    return {
      message: 'Product updated successfully',
      product: {
        productID: product.productID,
        productName: product.productName,
        productStock: product.productStock,
        stockLimit: product.stockLimit,
        stockStatus,
      },
    };
  }

  //obliterate product
  async removeProduct(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    const name = product.productName;
    await product.destroy();
    return { message: `${name} with ID ${id} removed` };
  }

  //order

  async viewAllCustomerOrders(): Promise<any[]> {
    return this.orderModel.findAll({
      include: [
        { model: Customer },
        { model: OrderItem, include: [Product] },
        { model: Payment },
      ],
    });
  }

  async cancelOrder(orderID: number) {
    const order = await this.orderModel.findByPk(orderID);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderID} not found`);
    }

    order.orderTotal = 0;
    order.payID = null;
    await order.save();

    return { message: `Order ${orderID} has been cancelled.` };
  }

  //orderItmes

  async getHighDemandItems(limit = 5) {
    const items = await this.orderItemModel.findAll({
      attributes: [
        'productID',
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalSold'],
      ],
      include: [
        {
          model: Product,
          attributes: ['productName', 'productBrand', 'productPrice'],
          required: true,
        },
      ],
      group: ['OrderItem.productID', 'product.productID'],
      order: [[Sequelize.literal('"totalSold"'), 'DESC']],
      limit,
    });

    for (const item of items) {
      console.log('DEBUG ITEM:', item.toJSON());
    }

    return items.map((item) => {
      const data = item.toJSON();

      return {
        productID: data.productID,
        productName: data.product?.productName ?? 'Unknown',
        productBrand: data.product?.productBrand ?? 'Unknown',
        productPrice: data.product?.productPrice ?? 0,
        totalSold: Number(data.totalSold) || 0,
      };
    });
  }
}
