import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { RegisterCustomerDto } from './dto/Register-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //create customer
  @Post() //localhost:3100/customer
  async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  //Get all customers
  @Get() //localhost:3100/customer
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  //Get comtomers by ID
  @Get(':cusID') //localhost:3100/customer/:cusID
  async findOne(@Param('cusID') id: number) {
    return this.customerService.findOne(id);
  }

  //Update customer data
  @Put('/update/:cusID') //localhost:3100/customer/update/:cusID
  async update(
    @Param('cusID', ParseIntPipe) cusID: number,
    @Body() updateData: RegisterCustomerDto,
  ) {
    return await this.customerService.update(cusID, updateData);
  }

  //Destroy customer MAHAHAHAHA
  @Delete('/delete/:cusID') //localhost:3100/customer/delete/:id
  async remove(@Param('cusID') id: number) {
    const destroyCus = await this.customerService.remove(+id);
    console.log(destroyCus);
    return { message: `Customer with id ${id} has been removed` };
  }

  @Post('register')
  register(@Body() dto: RegisterCustomerDto) {
    return this.customerService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginCustomerDto) {
    return this.customerService.login(dto);
  }
}
