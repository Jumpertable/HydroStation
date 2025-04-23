import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/manager.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Manager, Employee, Product, Order, OrderItem]),
  ],
  controllers: [ManagerController],
  providers: [ManagerService, EmployeeService],
  exports: [ManagerService],
})
export class ManagerModule {}
