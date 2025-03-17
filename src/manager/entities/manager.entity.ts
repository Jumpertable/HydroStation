import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'manager',
  timestamps: false,
})
export class Manager extends Model {
  @Column({})
  first_name: string;

  @Column({})
  last_name: string;

  @Column({})
  businessEmail: string;

  @Column({})
  companyAddress: string;

  @Column({})
  password: string;
}
