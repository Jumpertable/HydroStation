import { Module } from '@nestjs/common';
import { InvAlertsService } from './inv-alerts.service';
import { InvAlertsController } from './inv-alerts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryAlert } from './entities/inv-alert.entity';
import { ProductModule } from '../product/product.module';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([InventoryAlert, Product]),
    ProductModule,
  ],
  controllers: [InvAlertsController],
  providers: [InvAlertsService],
  exports: [InvAlertsService],
})
export class InvAlertsModule {}
