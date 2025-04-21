import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/manager.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Manager, Employee, Product])],
  controllers: [ManagerController],
  providers: [ManagerService, EmployeeService],
  exports: [ManagerService],
})
export class ManagerModule {}
