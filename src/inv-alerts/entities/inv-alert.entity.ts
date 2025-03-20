import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class InventoryAlert {
  @PrimaryGeneratedColumn()
  alertID: number;

  @Column()
  stockLIMIT: number;

  @Column()
  stockLIMITalert: number;

  @ManyToOne(() => Product, (product) => product.productID)
  product: Product;
}
