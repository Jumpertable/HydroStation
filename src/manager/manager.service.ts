import { Injectable } from '@nestjs/common';
import { ManagerLoginDto } from './dto/login.dto';
import { ManagerRegisterDto } from './dto/register.dto';

@Injectable()
export class ManagerService {
  create(managerLoginDto: ManagerLoginDto) {
    return 'This action adds a new manager';
  }

  findAll() {
    return `This action returns all manager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manager`;
  }

  update(id: number, managerRegisterDto: ManagerRegisterDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: number) {
    return `This action removes a #${id} manager`;
  }
}
