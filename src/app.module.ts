import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { Manager } from './manager/entities/manager.entity';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Employee } from './employee/entities/employee.entity';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { InvAlertsModule } from './inv-alerts/inv-alerts.module';
import { InventoryAlert } from './inv-alerts/entities/inv-alert.entity';
import { Order } from './order/entities/order.entity';
import { OrderItems } from './orderitem/entities/orderitem.entity';
import { OrderModule } from './order/order.module';
import { OrderItemsModule } from './orderitem/orderitem.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        Employee,
        Manager,
        Customer,
        Product,
        InventoryAlert,
        Order,
        OrderItems,
      ],
      autoLoadModels: false,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      Employee,
      Manager,
      Customer,
      Product,
      InventoryAlert,
    ]),
    EmployeeModule,
    ManagerModule,
    UtilityModule,
    GlobalHelperModule,
    AuthModule,
    CustomerModule,
    ProductModule,
    InvAlertsModule,
    OrderModule,
    OrderItemsModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
