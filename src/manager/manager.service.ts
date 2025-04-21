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

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager) private managerModel: typeof Manager,
    @InjectModel(Employee) private employeeModel: typeof Employee,
  ) {}

  async create(dto: ManagerRegisterDto) {
    const salt = await genSalt(10);
    const hashed = await hash(dto.password, salt);

    try {
      return await this.managerModel.create({ ...dto, password: hashed });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw new BadRequestException('Email already registered');
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

    const hashed = await hash(dto.password, 10);
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
    console.log('🔍 Checking for employees under manager ID:', manager_id);
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
}
