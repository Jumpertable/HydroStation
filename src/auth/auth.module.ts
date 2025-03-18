import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Employee } from 'src/employee/entities/employee.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Employee, Manager])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
