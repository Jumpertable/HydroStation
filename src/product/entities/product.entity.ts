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
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare productName: string;

  @HasMany(() => InventoryAlert)
  inventoryAlerts!: InventoryAlert[];

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare productPrice: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare productStock: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  productDes: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare productBrand: string;
}
