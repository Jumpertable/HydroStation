import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body()
    orderData: {
      cusID: number;
      items: { productID: number; amount: number }[];
    },
  ) {
    return this.orderService.create(orderData.cusID, orderData.items);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
}
