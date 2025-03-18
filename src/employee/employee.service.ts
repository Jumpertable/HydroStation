import { Injectable } from '@nestjs/common';
import { EmployeeLoginDto } from './dto/login.dto';
import { EmployeeRegisterDto } from './dto/register.dto';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  create(employeeLoginDto: EmployeeLoginDto) {
    return 'This action adds a new employee';
  }

  async findAll() {
    return await this.employeeModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, employeeRegisterDto: EmployeeRegisterDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
