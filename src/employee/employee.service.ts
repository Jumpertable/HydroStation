import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeLoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async findAll() {
    return await this.employeeModel.findAll({
      attributes: { exclude: ['manager_code'] },
    });
  }

  async findByManager(manager_id: number) {
    return this.employeeModel.findAll({
      where: { manager_id },
      attributes: [
        'employeeID',
        'first_name',
        'last_name',
        'businessEmail',
        'manager_code',
      ],
    });
  }

  async findOne(id: number) {
    const employee = await this.employeeModel.findByPk(id, {
      attributes: {
        exclude: ['manager_code'],
      },
    });
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async getProfile(id: number) {
    const employee = await this.employeeModel.findByPk(id, {
      attributes: {
        exclude: ['manager_code'],
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async login(dto: EmployeeLoginDto) {
    console.log('➡️ Login request payload:', dto);

    const employee = await this.employeeModel.findOne({
      where: {
        businessEmail: dto.businessEmail,
        manager_code: dto.manager_code,
      },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('🔐 Stored Hash:', employee.password);
    console.log('🔐 Password input:', dto.password);

    const isMatch = await compare(dto.password, employee.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      employeeID: employee.employeeID,
      email: employee.businessEmail,
    };
  }
}
