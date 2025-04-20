import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerRegisterDto } from './dto/register.dto';
import { ManagerLoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { EmployeeService } from 'src/employee/employee.service';

@Controller('manager')
export class ManagerController {
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
    const destroyManager = await this.managerService.remove(+id);
    console.log(destroyManager);
    if (destroyManager == 0) {
      throw new NotFoundException('Manager not missing!!');
    }
    return { message: `Manager with id ${id} has been removed` };
  }

  @Post(':id/create-employee')
  createEmployee(
    @Body() dto: EmployeeRegisterDto,
    @Body('manager_id') managerID: number,
  ) {
    return this.managerService.createEmployee(dto, managerID);
  }

  @Delete('remove-employee/:id')
  removeEmployee(@Param('id') id: string) {
    return this.managerService.removeEmployee(+id);
  }
}
