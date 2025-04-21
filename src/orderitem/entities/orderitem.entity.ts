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
import { Customer } from 'src/customer/entities/customer.entity';

@Table({ tableName: 'OrderItems' })
export class OrderItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  orderItemID: number;

  @ForeignKey(() => Order)
  @Column
  orderID: number;

  @BelongsTo(() => Order)
  order: Order;

  @ForeignKey(() => Customer)
  @Column
  cusID: number;

  @Column(DataType.STRING)
  cusName: string;

  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: true })
  productID: number;

  @Column(DataType.STRING)
  productName: string;

  @BelongsTo(() => Product)
  product: Product;

  @Column(DataType.INTEGER)
  amount: number;

  @Column(DataType.FLOAT)
  productPrice: number;
}
