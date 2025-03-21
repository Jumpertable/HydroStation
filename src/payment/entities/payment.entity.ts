import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

@Table({
  tableName: 'payments',
  timestamps: true,
})
export class Payment extends Model {
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amountPaid: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentStatus: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  OrderID: number;

  @BelongsTo(() => Order)
  order: Order;
}
