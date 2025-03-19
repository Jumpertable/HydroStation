import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
//import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
import { ManagerLoginDto } from 'src/manager/dto/login.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee,

    @InjectModel(Manager)
    private readonly managerModel: typeof Manager,

    private readonly jwtService: JwtService,
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

  //Manager Registration

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
      first_name: managerRegisterDto.first_name,
      last_name: managerRegisterDto.last_name,
      businessEmail: managerRegisterDto.businessEmail,
      companyAddress: managerRegisterDto.companyAddress,
      password: hashPassword,
    });

    return newMan;
  }

  //Manager Login

  async login(managerLoginDto: ManagerLoginDto) {
    const manager = await this.managerModel.findOne({
      where: { businessEmail: managerLoginDto.businessEmail },
    });
    if (!manager) {
      throw new UnauthorizedException('WHERE IS THE MANAGER!!!');
    }

    console.log('Manager Password:', manager.password);

    const isValid = await compare(managerLoginDto.password, manager.password);
    if (!isValid) {
      throw new UnauthorizedException('INCORRCT PASSWORD!!!');
    }

    const payload = { user_id: manager.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return { access_token: token };
  }
  
  async getManagerProfile(id: number) {
    return await this.managerModel.findByPk(id, {
      attributes: ['id', 'first_name', 'last_name', 'businessEmail'],
    });
  }
}
