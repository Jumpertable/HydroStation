import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Product } from 'src/product/entities/product.entity';

@Table({ tableName: 'Orders', timestamps: true })
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare orderID: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  declare orderTotal: number | null;

  @ForeignKey(() => Customer)
  @Column
  declare cusID: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @HasMany(() => OrderItem, { as: 'orderItems' })
  declare orderItems: OrderItem[];

  @ForeignKey(() => Payment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare payID: number | null;

  @BelongsTo(() => Payment, { onDelete: 'SET NULL' })
  declare payment: Payment;

  @ForeignKey(() => Product)
  @Column
  productID: number;

  @BelongsTo(() => Product)
  product: Product;
}
