import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'customer',
  timestamps: false,
})
export class Customer extends Model {
  @PrimaryKey // Mark as primary key
  @AutoIncrement //incrementing ID
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  cusID: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  cusName: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  cusEmail: string;

  @Column({
    type: DataType.STRING(255),
  })
  cusPhone: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  cusAddr: string;
}
