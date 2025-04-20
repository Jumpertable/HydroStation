import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  AutoIncrement,
  Table,
} from 'sequelize-typescript';
import { Manager } from 'src/manager/entities/manager.entity';

@Table({
  tableName: 'employee',
  timestamps: false,
})
export class Employee extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare employeeID: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare businessEmail: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare companyAddress: string;

  @ForeignKey(() => Manager)
  @Column({
    type: DataType.INTEGER,
  })
  declare manager_id: number;

  @BelongsTo(() => Manager)
  declare manager: Manager;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare manager_code: string;

  get name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
