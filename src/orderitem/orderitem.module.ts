import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItems } from './entities/orderitem.entity';
import { OrderItemsService } from './orderitem.service';
import { OrderItemsController } from './orderitem.controller';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderItems, Order, Product])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
