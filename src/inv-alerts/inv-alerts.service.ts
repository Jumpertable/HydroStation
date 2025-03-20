import { Injectable } from '@nestjs/common';
import { CreateInvAlertDto } from './dto/create-inv-alert.dto';
import { UpdateInvAlertDto } from './dto/update-inv-alert.dto';

@Injectable()
export class InvAlertsService {
  create(createInvAlertDto: CreateInvAlertDto) {
    return 'This action adds a new invAlert';
  }

  findAll() {
    return `This action returns all invAlerts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invAlert`;
  }

  update(id: number, updateInvAlertDto: UpdateInvAlertDto) {
    return `This action updates a #${id} invAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} invAlert`;
  }
}
