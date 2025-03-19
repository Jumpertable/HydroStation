import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { ManagerModule } from './manager/manager.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Employee } from './employee/entities/employee.entity';
import { Manager } from './manager/entities/manager.entity';
import { AuthModule } from './auth/auth.module';

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
      models: [Employee, Manager],
      autoLoadModels: true,
      sync: { alter: true },
    }),
    EmployeeModule,
    ManagerModule,
    UtilityModule,
    GlobalHelperModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
