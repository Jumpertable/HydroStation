import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItems } from '../orderitem/entities/orderitem.entity';
import { Product } from '../product/entities/product.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItems, Product])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
