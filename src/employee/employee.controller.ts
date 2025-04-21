import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeLoginDto } from './dto/login.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('login')
  login(@Body() dto: EmployeeLoginDto) {
    return this.employeeService.login(dto);
  }

  @Get('profile') //localhost:3100/employee/
  findAll() {
    return this.employeeService.findAll();
  }

  @Get('/profile/:id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }
}
