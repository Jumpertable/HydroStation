import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
// import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
import { ManagerLoginDto } from 'src/manager/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('employee/regist') //localhost:3100/auth/employee/regist
  @HttpCode(201)
  async registerEmployee(@Body() employeeRegisterDto: EmployeeRegisterDto) {
    await this.authService.registerEmployee(employeeRegisterDto); // Correct service method
    return {
      message: 'Employee Registration Complete!',
    };
  }

  //Manager

  //"first_name": "r",
  //"last_name": "r",
  //"businessEmail": "r",
  //"companyAddress": "non",
  //"password": "r"

  @Post('/manager/regist') //localhost:3100/auth/manager/regist
  @HttpCode(201)
  async registerManager(@Body() managerRegisterDto: ManagerRegisterDto) {
    await this.authService.registerManager(managerRegisterDto); // Correct service method
    return {
      message: 'Manager Registration Complete!',
    };
  }

  //"businessEmail": "r",
  //"password": "r"

  @Post('/manager/login') //localhost:3100/auth/manager/login
  @HttpCode(201)
  async login(@Body() managerLoginDto: ManagerLoginDto) {
    return this.authService.login(managerLoginDto);
  }

  //Only manager
  @UseGuards(JwtAuthGuard)
  @Get('/manager/profile') //localhost:3000/auth/profile
  async getUserProfile(@Request() req) {
    return await this.authService.getManagerProfile(Number(req.user.user_id));
  }
}
