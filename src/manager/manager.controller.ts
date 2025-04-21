import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerRegisterDto } from './dto/register.dto';
import { ManagerLoginDto } from './dto/login.dto';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('manager')
export class ManagerController {
  employeeModel: any;
  constructor(
    private readonly managerService: ManagerService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('/regist')
  create(@Body() managerRegisterDto: ManagerRegisterDto) {
    return this.managerService.create(managerRegisterDto);
  }

  @Post('login')
  async login(@Body() dto: ManagerLoginDto) {
    return this.managerService.login(dto);
  }

  @Get()
  async findAll() {
    return await this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() managerRegisterDto: ManagerRegisterDto,
  ) {
    return await this.managerService.update(+id, managerRegisterDto);
  }

  @Delete('/delete/:id') //localhost:3100/manager/delete/:id
  async remove(@Param('id') id: string) {
    const manager = await this.managerService.findOne(+id); //fetches manager

    const destroyed = await this.managerService.remove(+id);

    if (destroyed === 0) {
      throw new NotFoundException('Manager missing!!');
    }

    return {
      message: `Manager ${manager.first_name} with id ${id} has been removed`,
    };
  }

  //employeee

  @Post(':id/create-employee')
  createEmployee(@Body() dto: EmployeeRegisterDto) {
    return this.managerService.createEmployee(dto, dto.manager_id);
  }

  @Patch('update-employee/:id')
  updateEmployee(@Param('id') id: string, @Body() dto: EmployeeRegisterDto) {
    return this.managerService.updateEmployee(+id, dto);
  }

  @Get(':id/employees')
  async getEmployeesUnderManager(@Param('id') id: string) {
    return this.managerService.getEmployeesUnderManager(+id);
  }

  @Delete('remove-employee/:id')
  removeEmployee(@Param('id') id: string) {
    return this.managerService.removeEmployee(+id);
  }
}
