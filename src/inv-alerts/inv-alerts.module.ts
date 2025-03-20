import { Module } from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InvAlertsController } from './inv-alerts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryAlert } from './entities/inv-alert.entity';

@Module({
  imports: [SequelizeModule.forFeature([InventoryAlert])],
  controllers: [InvAlertsController],
  providers: [InvAlertsService],
  exports: [InvAlertsService],
})
export class InvAlertsModule {}
