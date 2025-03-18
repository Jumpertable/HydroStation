import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'employee',
  timestamps: false,
})
export class Employee extends Model {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  businessEmail: string;

  @Column({
    type: DataType.STRING(50),
  })
  companyAddress: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  manager_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  manager_code: string;
}
