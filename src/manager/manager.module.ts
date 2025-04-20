import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/manager.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Manager, Employee]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ManagerController],
  providers: [ManagerService, EmployeeService],
  exports: [ManagerService],
})
export class ManagerModule {}
