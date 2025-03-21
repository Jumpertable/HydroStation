import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { InventoryAlert } from 'src/inv-alerts/entities/inv-alert.entity';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productName: string;

  @HasMany(() => InventoryAlert)
  inventoryAlerts: InventoryAlert[];

  @Column({
    type: DataType.TEXT,
  })
  productDes: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  productPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productStock: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productBrand: string;
}
