import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';

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

  @Get('/customer/:cusID/active')
  async findActiveOrderByCustomer(
    @Param('cusID', ParseIntPipe) cusID: number,
    @Res() res: Response,
  ) {
    console.log('🛒 Looking up active order for customer:', cusID);
    const order = await this.orderService.findActiveByCustomer(cusID);

    if (!order) {
      return res.status(204).send();
    }

    return res.status(200).json(order);
  }

  @Get('customer/:cusID/completed')
  getCompletedOrdersByCustomer(@Param('cusID', ParseIntPipe) cusID: number) {
    return this.orderService.findCompletedByCustomer(cusID);
  }
}
