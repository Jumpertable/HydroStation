import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { OrderItemsService } from './orderitem.service';
import { CreateOrderItemDto } from './dto/create-orderitem.dto';
import { UpdateOrderitemDto } from './dto/update-orderitem.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  // Get All order Items
  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  // Get Order Item by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Get('/order/:orderID')
  findByOrder(@Param('orderID', ParseIntPipe) orderID: number) {
    return this.orderItemsService.findByOrder(orderID);
  }

  // Update Order Item
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderitemDto,
  ) {
    return this.orderItemsService.update(id, dto);
  }

  //remoooovveee
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemsService.remove(id);
  }
}
