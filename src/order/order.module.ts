import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Product } from '../product/entities/product.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderItem, Product, Payment, Customer]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
