import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,

    @InjectModel(Manager)
    private readonly managerModel: typeof Manager,
  ) {}

  async registerEmployee(employeeRegisterDto: EmployeeRegisterDto) {
    const employee = await this.employeeModel.findOne({
      where: { businessEmail: employeeRegisterDto.businessEmail },
    });
    if (employee) {
      throw new BadRequestException(
        'This email already exists. Please try again.',
      );
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(employeeRegisterDto.password, salt);
  }

  async registerManager(managerRegisterDto: ManagerRegisterDto) {
    const manager = await this.managerModel.findOne({
      where: { businessEmail: managerRegisterDto.businessEmail },
    });
    if (manager) {
      throw new BadRequestException(
        'This email already exists. Please try again.',
      );
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(managerRegisterDto.password, salt);
  }
}
