import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
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
  async loginEmployee(employeeLoginDto: EmployeeLoginDto) {
    const employee = await this.employeeModel.findOne({
      where: { businessEmail: employeeLoginDto.businessEmail },
      attributes: ['employeeID', 'password', 'manager_code'],
      raw: true,
    });

    if (!employee || !employee.employeeID) {
      throw new UnauthorizedException('Employee not found');
    }

    const isValid = await compare(employeeLoginDto.password, employee.password);
    if (!isValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { employee_id: employee.employeeID };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY || 'default_secret_key',
    });

    return { access_token: token };
  }

  async getEmployeeProfile(id: number) {
    return await this.employeeModel.findByPk(id, {
      attributes: ['employeeID', 'first_name', 'last_name', 'businessEmail'],
    });
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

  async loginManager(managerLoginDto: ManagerLoginDto) {
    console.log(
      '📥 Received login request for:',
      managerLoginDto.businessEmail,
    );
    try {
      const manager = await this.managerModel.findOne({
        where: { businessEmail: managerLoginDto.businessEmail },
      });
      if (!manager) {
        throw new UnauthorizedException(
          'This email does not exist. Please try again.',
        );
      }

      const isValid = await compare(managerLoginDto.password, manager.password);
      if (!isValid) {
        throw new UnauthorizedException('Incorrect password');
      }

      const payload = { user_manager_id: manager.manager_id };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return { access_token: token };
    } catch (err) {
      console.error('🔥 Error during login:', err);
      throw new UnauthorizedException(
        'Login failed — check credentials or configuration',
      );
    }
  }

  async getManagerProfile(id: number) {
    return await this.managerModel.findByPk(id, {
      attributes: ['id', 'first_name', 'last_name', 'businessEmail'],
    });
  }
}
//why does this have to be difficult???
