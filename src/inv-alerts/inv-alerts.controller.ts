import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InventoryAlert } from './entities/inv-alert.entity';

@Controller('inv-alerts')
export class InvAlertsController {
  constructor(private readonly invAlertsService: InvAlertsService) {}

  //Create Inventory Alert
  @Post() //localhost:3100/int-alerts
  async create(
    @Body() alertData: { productID: number; stockLimit: number },
  ): Promise<InventoryAlert> {
    const { productID, stockLimit } = alertData;

    if (!productID || typeof productID !== 'number') {
      throw new BadRequestException(
        'Invalid or missing productID. It must be a number.',
      );
    }
    if (!stockLimit || typeof stockLimit !== 'number') {
      throw new BadRequestException(
        'Invalid or missing stockLimit. It must be a number.',
      );
    }

    return this.invAlertsService.create(productID, stockLimit);
  }

  //Gett all alerts
  @Get() //localhost:3100/int-alerts
  async createAlert(@Body() body: { productID: number; stockLimit: number }) {
    return this.invAlertsService.create(body.productID, body.stockLimit);
  }

  //Get alerts by id
  @Get('/check/:id') //localhost:3100/int-alerts/check/:id
  async checkStock(
    @Query('productID') productID: number,
    @Query('stockLimit') stockLimit: number,
  ) {
    return this.invAlertsService.checkStockLimit(productID, stockLimit);
  }

  //Update alerts
  @Put(':id') //localhost:3100/int-alerts/:id
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<InventoryAlert>,
  ): Promise<InventoryAlert> {
    return this.invAlertsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.invAlertsService.remove(+id);
  }
}

//I may be a little confused on this one
