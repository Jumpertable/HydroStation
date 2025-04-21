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
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

@Controller('manager')
export class ManagerController {
  employeeModel: any;
  constructor(
    private readonly managerService: ManagerService,
    private readonly employeeService: EmployeeService,
  ) {}

  //first_name, last_name, businessEmail, companyAddress, password
  @Post('/regist')
  create(@Body() managerRegisterDto: ManagerRegisterDto) {
    return this.managerService.create(managerRegisterDto);
  }

  //businessEmail, password
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

  //first_name, last_name, businessEmail, companyAddress, password
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

  //first_name, last_name, businessEmail, password, manager_id
  @Post(':id/create-employee')
  createEmployee(@Body() dto: EmployeeRegisterDto) {
    return this.managerService.createEmployee(dto, dto.manager_id);
  }

  //first_name, last_name, businessEmail, password, manager_id
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

  //product

  //productName, productDes, productPrice, productStock, productBrand
  @Post('add-product')
  addProduct(@Body() dto: CreateProductDto) {
    return this.managerService.addProduct(dto);
  }

  //productName, productDes, productPrice, productStock, productBrand
  @Patch('update-product/:id')
  updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.managerService.updateProduct(+id, dto);
  }

  @Delete('remove-product/:id')
  removeProduct(@Param('id') id: number) {
    return this.managerService.removeProduct(+id);
  }
}
