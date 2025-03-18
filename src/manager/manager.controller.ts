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
import { ManagerLoginDto } from './dto/login.dto';
import { ManagerRegisterDto } from './dto/register.dto';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post()
  create(@Body() managerLoginDto: ManagerLoginDto) {
    return this.managerService.create(managerLoginDto);
  }

  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() managerRegisterDto: ManagerRegisterDto,
  ) {
    return this.managerService.update(+id, managerRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
