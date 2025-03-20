import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  //create customer
  @Post() //localhost:3100/customer
  async create(@Body() customerData: Partial<Customer>): Promise<Customer> {
    return this.customerService.create(customerData);
  }

  //Get all cumtomers
  @Get() //localhost:3100/customer
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  //Get comtomers by ID
  @Get(':id') //localhost:3100/customer/:id
  async findOne(@Param('id') id: number): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  //Update customer data
  @Put('/update/:id') //localhost:3100/customer/update/:id
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Customer>,
  ): Promise<Customer> {
    return this.customerService.update(id, updateData);
  }

  //Destroy customer MAHAHAHAHA
  @Delete('/delete/:id') //localhost:3100/customer/delete/:id
  async remove(@Param('id') id: number) {
    const destroyCus = await this.customerService.remove(+id);
    console.log(destroyCus);
    return { message: `Customer with id ${id} has been removed` };
  }
}
