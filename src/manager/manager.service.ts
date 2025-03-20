import { Injectable, NotFoundException } from '@nestjs/common';
import { ManagerRegisterDto } from './dto/register.dto';
import { Manager } from './entities/manager.entity';
import { InjectModel } from '@nestjs/sequelize';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager)
    private managerModel: typeof Manager,
  ) {}

  async create(managerRegisterDto: ManagerRegisterDto) {
    const salt = await genSalt(20);
    const hashedPassword = await hash(managerRegisterDto.password, salt);
    const newMan = await this.managerModel.create({
      ...managerRegisterDto,
      password: hashedPassword,
    });
    return newMan;
  }

  async findAll() {
    return await this.managerModel.findAll();
  }

  async findOne(id: number) {
    const manager = await this.managerModel.findByPk(id);
    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }
    return manager;
  }

  async update(id: number, managerRegisterDto: ManagerRegisterDto) {
    const manager = await this.findOne(id);

    // If password is being updated, hash it; otherwise, keep the old one
    let hashedPassword = manager.password;
    if (managerRegisterDto.password) {
      const salt = await genSalt(10);
      hashedPassword = await hash(managerRegisterDto.password, salt);
    }

    await manager.update({
      ...managerRegisterDto,
      password: hashedPassword, // Ensure only updated if provided
    });

    return manager;
  }

  async remove(id: number) {
    return await this.managerModel.destroy({
      where: { id: id },
    });
  }
}
