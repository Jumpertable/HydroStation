import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './entities/employee.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Manager])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
