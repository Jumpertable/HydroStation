import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import { Product } from '../../product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';

@Table({ tableName: 'OrderItems' })
export class OrderItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  orderItemID: number;

  @ForeignKey(() => Order)
  @Column
  declare orderID: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => Product)
  @Column
  productID: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column(DataType.INTEGER)
  amount: number;

  @Column(DataType.FLOAT)
  productPrice: number;
}
