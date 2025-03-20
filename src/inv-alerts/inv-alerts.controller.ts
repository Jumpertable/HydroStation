import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { CreateInvAlertDto } from './dto/create-inv-alert.dto';
import { UpdateInvAlertDto } from './dto/update-inv-alert.dto';

@Controller('inv-alerts')
export class InvAlertsController {
  constructor(private readonly invAlertsService: InvAlertsService) {}

  @Post()
  create(@Body() createInvAlertDto: CreateInvAlertDto) {
    return this.invAlertsService.create(createInvAlertDto);
  }

  @Get()
  findAll() {
    return this.invAlertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invAlertsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvAlertDto: UpdateInvAlertDto) {
    return this.invAlertsService.update(+id, updateInvAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invAlertsService.remove(+id);
  }
}
