import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'manager',
  timestamps: false,
})
export class Manager extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'manager_id',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare manager_id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  businessEmail!: string;

  @Column({
    type: DataType.STRING(255),
  })
  companyAddress: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password: string;
}
