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
  @PrimaryKey // ✅ Mark as primary key
  @AutoIncrement // ✅ Auto-incrementing ID
  @Column({
    type: DataType.INTEGER, // ✅ Use INTEGER type for ID
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  first_name!: string;

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
  password!: string;
}
