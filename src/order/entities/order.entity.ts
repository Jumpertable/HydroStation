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
  HasOne,
} from 'sequelize-typescript';
import { Customer } from '../../customer/entities/customer.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Table({ tableName: 'Orders', timestamps: true })
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  declare orderID: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare orderTotal: number | null;

  @ForeignKey(() => Customer)
  @Column
  declare cusID: number;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @HasMany(() => OrderItem, { as: 'orderItems' })
  declare orderItems: OrderItem[];

  @HasOne(() => Payment)
  declare payment: Payment;
  static orderID: unknown;
}
