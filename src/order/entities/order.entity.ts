import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItems } from 'src/orderitem/entities/orderitem.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
})
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  OrderID: number;

  //link to custoer
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cusID: number;

  @BelongsTo(() => Customer)
  customer: Customer;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  OrderTotal: number;
}
