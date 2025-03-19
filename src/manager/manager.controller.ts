import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerRegisterDto } from './dto/register.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('/regist')
  create(@Body() managerRegisterDto: ManagerRegisterDto) {
    return this.managerService.create(managerRegisterDto);
  }

  @Get()
  async findAll() {
    return await this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() managerRegisterDto: ManagerRegisterDto,
  ) {
    return await this.managerService.update(+id, managerRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
