import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRegisterDto } from './dto/register.dto';
import { Employee } from './entities/employee.entity';
import { InjectModel } from '@nestjs/sequelize';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private employeeModel: typeof Employee,
  ) {}

  async create(employeeRegisterDto: EmployeeRegisterDto) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(employeeRegisterDto.password, salt);
    const newEmployee = await this.employeeModel.create({
      ...employeeRegisterDto,
      password: hashedPassword,
    });
    return newEmployee;
  }

  async findAll() {
    return await this.employeeModel.findAll();
  }

  async findOne(id: number) {
    const employee = await this.employeeModel.findByPk(id);
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(id: number, employeeRegisterDto: EmployeeRegisterDto) {
    const employee = await this.findOne(id);
    const salt = await genSalt(10);
    const hashedPassword = await hash(employeeRegisterDto.password, salt);
    await employee.update({
      ...employeeRegisterDto,
      password: hashedPassword,
    });
    return employee;
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    await employee.destroy();
    return { message: `Employee with id ${id} has been removed` };
  }
}
