import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/orderitem/entities/orderitem.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  orderID: number;

  @Column()
  orderTotal: number;

  @ManyToOne(() => Customer, (customer) => customer.cusID)
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
