import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  cusID: number;

  @Column()
  cusName: string;

  @Column()
  cusEmail: string;

  @Column()
  cusPhone: string;

  @Column()
  cusAddr: string;

  @OneToMany(() => Order, (order) => order.customer, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orders: Order[];
}
