import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

@Table({ tableName: 'Payments', timestamps: true })
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare payID: number;

  @Column(DataType.INTEGER)
  declare cusID: number;

  @Column(DataType.FLOAT)
  payAmount: number;

  @Column(DataType.STRING)
  payMethod: string;

  @Column(DataType.STRING)
  payTrans: string;

  @Column(DataType.STRING)
  payStatus: string;

  @HasMany(() => Order, {
    onDelete: 'SET NULL', // prevents constraint error when deleting orders
    foreignKey: 'payID',
  })
  orders: Order[];
}
