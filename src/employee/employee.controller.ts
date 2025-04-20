import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeRegisterDto } from './dto/register.dto';
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() employeeResgisterDto: EmployeeRegisterDto,
  ) {
    return this.employeeService.update(+id, employeeResgisterDto);
  }

  @Delete('/delete/:id') //localhost:3100/manager/delete/:id
  async remove(@Param('id') id: string) {
    const destroyEmployee = await this.employeeService.remove(+id);
    console.log(destroyEmployee);
    if (destroyEmployee == 0) {
      throw new NotFoundException('Employee on the loose!!');
    }
    return { message: `Employee with id ${id} has been removed` };
  }
}
