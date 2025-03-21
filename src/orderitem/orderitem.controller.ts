import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { OrderItemsService } from './orderitem.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async create(
    @Body() body: { orderID: number; productID: number; amount: number },
  ) {
    return this.orderItemsService.create(
      body.orderID,
      body.productID,
      body.amount,
    );
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':orderID')
  findByOrder(@Param('orderID') orderID: number) {
    return this.orderItemsService.findByOrder(orderID);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.orderItemsService.remove(id);
  }
}
