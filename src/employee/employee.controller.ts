import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeRegisterDto } from './dto/register.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employeeRegisterDto: EmployeeRegisterDto) {
    return this.employeeService.create(employeeRegisterDto);
  }

  @Get() //localhost:3100/employee/
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() employeeResgisterDto: EmployeeRegisterDto,
  ) {
    return this.employeeService.update(+id, employeeResgisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
