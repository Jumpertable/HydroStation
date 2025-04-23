import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
import { ManagerLoginDto } from 'src/manager/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('employee/regist') //localhost:3100/auth/employee/regist
  @HttpCode(201)
  async loginEmployee(@Body() employeeLoginDto: EmployeeLoginDto) {
    await this.authService.loginEmployee(employeeLoginDto); // Correct service method
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

  @Post('manager/regist') //localhost:3100/auth/manager/regist
  @HttpCode(201)
  async registerManager(@Body() managerRegisterDto: ManagerRegisterDto) {
    await this.authService.registerManager(managerRegisterDto); // Correct service method
    return {
      message: 'Manager Registration Complete!',
    };
  }

  //"businessEmail": "r",
  //"password": "r"

  @Post('manager/login') //localhost:3100/auth/manager/login
  @HttpCode(201)
  async loginManager(@Body() managerLoginDto: ManagerLoginDto) {
    console.log('Received login request:', managerLoginDto); 
    return this.authService.loginManager(managerLoginDto);
  }

  //Only manager
  @UseGuards(JwtAuthGuard)
  @Get('/manager/profile') //localhost:3100/auth/manager/profile
  async getUserProfile(@Request() req) {
    console.log('🛂 Extracting ID from request:', req.user.user_id);
    if (!req.user.user_id) {
      throw new BadRequestException('User ID is missing');
    }
    return await this.authService.getManagerProfile(Number(req.user.user_id));
  }
}
