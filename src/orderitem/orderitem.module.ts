import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from './entities/orderitem.entity';
import { OrderItemsService } from './orderitem.service';
import { OrderItemsController } from './orderitem.controller';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [SequelizeModule.forFeature([OrderItem, Order, Product, Customer])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
