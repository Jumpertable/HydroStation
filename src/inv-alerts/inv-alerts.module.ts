import { Module } from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InvAlertsController } from './inv-alerts.controller';

@Module({
  controllers: [InvAlertsController],
  providers: [InvAlertsService],
})
export class InvAlertsModule {}
