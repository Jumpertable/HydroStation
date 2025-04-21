import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order') //localhost:3100/order
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post() //localhost:3100/order + raw
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('cus/:cusID') //localhost:3100/order/cus/cusID
  getOrdersByCus(@Param('cusID') cusID: number) {
    return this.orderService.findByCusId(cusID);
  }
}
