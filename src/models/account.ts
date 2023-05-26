import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { User } from './user'

@Table
export class Account extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string

  @Column({ type: DataType.NUMBER, allowNull: false })
  declare amount: number

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare debt: boolean

  @ForeignKey(() => User)
  declare user: User

  @CreatedAt
  declare creationDate: Date

  @UpdatedAt
  declare updatedOn: Date

  @Index
  @DeletedAt
  declare deletionDate: Date
}
