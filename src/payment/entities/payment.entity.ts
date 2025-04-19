import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from 'src/order/entities/order.entity';

@Table({ tableName: 'Payments', timestamps: true })
export class Payment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare payID: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  declare orderID: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @Column({
    type: DataType.STRING,
  })
  declare payMethod: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare payTrans?: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare amount: number;
}
