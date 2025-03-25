import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Product } from 'src/product/entities/product.entity';

@Table
export class InventoryAlert extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  alertID: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stockLimit: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  stockLimitAlert: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productID: number;

  @BelongsTo(() => Product)
  product: Product;
}
