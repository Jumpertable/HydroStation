import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Manager } from 'src/manager/entities/manager.entity';

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
    unique: true,
  })
  businessEmail: string;

  @Column({
    type: DataType.STRING(50),
  })
  companyAddress: string;

  @ForeignKey(() => Manager)
  @Column({
    type: DataType.INTEGER,
  })
  manager_id: number;

  @BelongsTo(() => Manager)
  manager: Manager;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  manager_code: string;
}
