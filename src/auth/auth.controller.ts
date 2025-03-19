import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { ManagerRegisterDto } from 'src/manager/dto/register.dto';
// import { EmployeeLoginDto } from 'src/employee/dto/login.dto';
// import { ManagerLoginDto } from 'src/manager/dto/login.dto';
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

  @Post('/manager/regist') //localhost:3100/auth/manager/regist
  @HttpCode(201)
  async registerManager(@Body() managerRegisterDto: ManagerRegisterDto) {
    await this.authService.registerManager(managerRegisterDto); // Correct service method
    return {
      message: 'Manager Registration Complete!',
    };
  }
}
