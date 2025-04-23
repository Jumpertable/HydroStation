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

  async login(managerLoginDto: ManagerLoginDto) {
    console.log('📥 Received Login Request:', managerLoginDto);

    const manager = await this.managerModel.findOne({
      where: { businessEmail: managerLoginDto.businessEmail },
      attributes: ['id', 'businessEmail', 'password'],
      raw: true,
    });

    if (!manager || !manager.id) {
      console.error('❌ Manager not found or ID missing');
      throw new UnauthorizedException('WHERE IS THE MANAGER!?!');
    }

    const isValid = await compare(managerLoginDto.password, manager.password);
    if (!isValid) {
      console.error('❌ Incorrect password');
      throw new UnauthorizedException('INCORRECT PASSWORD!!!');
    }

    const payload = { user_id: manager.id };
    console.log('📝 Signing JWT with payload:', payload);
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY || 'default_secret_key',
    });
    console.log('🔑 Generated Token:', token);

    return { access_token: token };
  }

  async getManagerProfile(id: number) {
    return await this.managerModel.findByPk(id, {
      attributes: ['id', 'first_name', 'last_name', 'businessEmail'],
    });
  }
}
//why does this have to be difficult???
