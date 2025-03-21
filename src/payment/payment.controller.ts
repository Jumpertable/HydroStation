import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() body: { orderID: number; amount: number; method: string }) {
    return this.paymentService.create(body.orderID, body.amount, body.method);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':orderID') //localhost:3100/payment/orderID
  findByOrder(@Param('orderID') orderID: number) {
    return this.paymentService.findByOrder(orderID);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdatePaymentDto) {
    return this.paymentService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
