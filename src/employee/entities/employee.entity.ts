import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'employee',
  timestamps: false,
})
export class Employee extends Model {
  @Column({})
  first_name: string;

  @Column({})
  last_name: string;

  @Column({})
  businessEmail: string;

  @Column({})
  companyAddress: string;

  @Column({})
  manager_name: string;

  @Column({})
  password: string;

  @Column({})
  manager_code: string;
}
