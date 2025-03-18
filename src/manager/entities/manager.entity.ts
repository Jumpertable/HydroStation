/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'manager',
  timestamps: false,
})
export class Manager extends Model {
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
  password: string;
}
