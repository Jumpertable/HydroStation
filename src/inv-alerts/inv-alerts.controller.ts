import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InventoryAlert } from './entities/inv-alert.entity';

@Controller('inv-alerts')
export class InvAlertsController {
  constructor(private readonly invAlertsService: InvAlertsService) {}

  //Create Inventory Alert
  @Post() //localhost:3100/int-alerts
  async create(
    @Body() alertData: Partial<InventoryAlert>,
  ): Promise<InventoryAlert> {
    const { productID, stockLimit, stockLimitAlert } = alertData;
    let newStockLimitAlert: string = '';

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
    if (typeof stockLimitAlert !== 'string') {
      throw new BadRequestException(
        'Invalid or missing stockLimitAlert. It must be a boolean.',
      );
    }

    if (stockLimit < 10) {
      newStockLimitAlert = `Warning! the stock for ${productID} is under 10`;
    }

    return this.invAlertsService.create(
      // alertData,
      productID,
      stockLimit,
      newStockLimitAlert,
    );
  }

  //Gett all alerts
  @Get() //localhost:3100/int-alerts
  findAll() {
    return this.invAlertsService.findAll();
  }

  //Get alerts by id
  @Get(':id') //localhost:3100/int-alerts/:id
  async findOne(@Param('id') id: number): Promise<InventoryAlert> {
    return this.invAlertsService.findOne(+id);
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
