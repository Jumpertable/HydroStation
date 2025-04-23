import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerRegisterDto } from './dto/register.dto';
import { EmployeeRegisterDto } from 'src/employee/dto/register.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';

@Controller('manager')
export class ManagerController {
  employeeModel: any;
  constructor(private readonly managerService: ManagerService) {}

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

  //productName, productDes O, productPrice O, productStock O, productBrand O, stockLimit O
  @Patch('update-product/:id')
  updateProduct(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.managerService.updateProduct(+id, dto);
  }

  @Delete('remove-product/:id')
  removeProduct(@Param('id') id: number) {
    return this.managerService.removeProduct(+id);
  }

  //order

  @Get('view-all-orders')
  async viewAllCustomerOrders() {
    return this.managerService.viewAllCustomerOrders();
  }

  @Patch('cancel-order/:id')
  cancelOrder(@Param('id') id: number) {
    return this.managerService.cancelOrder(id);
  }

  //orderitem

  @Get(['high-demand-items', 'high-demand-items/:limit'])
  getHighDemandItems(@Param('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.managerService.getHighDemandItems(parsedLimit);
  }

  //manager

  @Get()
  async findAll() {
    return await this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid manager ID');
    }
    return this.managerService.findOne(parsedId);
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
}
