import { Account } from './account'
import {
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript'

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string

  @HasMany(() => Account, { onDelete: 'CASCADE' })
  declare accounts: Account[]

  @CreatedAt
  declare creationDate: Date

  @UpdatedAt
  declare updatedOn: Date

  @DeletedAt
  declare deletionDate: Date
}
