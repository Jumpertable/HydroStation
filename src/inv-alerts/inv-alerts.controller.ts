import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InventoryAlert } from './entities/inv-alert.entity';

@Controller('inv-alerts')
export class InvAlertsController {
  constructor(private readonly invAlertsService: InvAlertsService) {}

  //Get alerts by id or product name :)
  @Get('/check') //localhost:3100/int-alerts/check?productId= ... pr productName= ...
  async checkStock(
    @Query('productID') productID: number,
    @Query('stockLimit') stockLimit: number,
    @Query('productName') productName?: string,
  ) {
    return this.invAlertsService.checkStockLimit(
      productID,
      //default to 50 because I'm already too confused
      stockLimit ?? 50,
      productName,
    );
  }

  @Post()
  async create() {}

  @Get()
  async createAlert(@Body() body: { productID: number; stockLimit: number }) {
    return this.invAlertsService.create(body.productID, body.stockLimit);
  }

  @Put()
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<InventoryAlert>,
  ): Promise<InventoryAlert> {
    return this.invAlertsService.update(id, updateData);
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    return this.invAlertsService.remove(+id);
  }
}

//I may be a little confused on this one
