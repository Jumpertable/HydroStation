import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryAlert } from './entities/inv-alert.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class InvAlertsService {
  constructor(
    @InjectModel(InventoryAlert)
    private readonly inventoryAlertModel: typeof InventoryAlert,
    @InjectModel(Product) private productModel: typeof Product,
  ) {}

  async create(
    alertData,
    productID: number,
    stockLimit: number,
    stockLimitAlert: number,
  ) {
    const product = await this.productModel.findByPk(productID);
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productID} does not exist.`,
      );
    }

    const newAlert = await this.inventoryAlertModel.create({
      productID,
      stockLimit,
      stockLimitAlert,
    });

    return newAlert;
  }

  async findAll(): Promise<InventoryAlert[]> {
    return this.inventoryAlertModel.findAll();
  }

  async findOne(id: number): Promise<InventoryAlert> {
    const alert = await this.inventoryAlertModel.findByPk(id);
    if (!alert) {
      throw new NotFoundException(`Inventory Alert with ID ${id} not found`);
    }
    return alert;
  }

  async update(
    id: number,
    updateData: Partial<InventoryAlert>,
  ): Promise<InventoryAlert> {
    const [affectedRows] = await this.inventoryAlertModel.update(updateData, {
      where: { alertID: id },
    });

    if (affectedRows === 0) {
      throw new NotFoundException(`Inventory Alert with ID ${id} not found`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.inventoryAlertModel.destroy({
      where: { alertID: id },
    });

    if (deletedCount === 0) {
      throw new NotFoundException(`Inventory Alert with ID ${id} not found`);
    }
  }
}
