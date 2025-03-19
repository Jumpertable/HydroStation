import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
//import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
//import { ManagerLoginDto } from 'src/manager/dto/login.dto';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,

    @InjectModel(Manager)
    private readonly managerModel: typeof Manager,
  ) {}

  //Employee

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

    const newEmp = await this.employeeModel.create({
      first_name: employeeRegisterDto.first_name,
      last_name: employeeRegisterDto.last_name,
      businessEmail: employeeRegisterDto.businessEmail,
      password: hashPassword,
    });

    return newEmp;
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

    const newMan = await this.managerModel.create({
      ...managerRegisterDto,
      password: hashPassword,
    });

    return newMan;
  }
}
