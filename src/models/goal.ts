import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  DeletedAt,
  Index,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import { User } from './user'
import Decimal from 'decimal.js'

enum GoalRecurrence {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

@Table({ paranoid: true })
export class Goal extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, allowNull: false })
  declare id: string

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    get() {
      return new Decimal(this.getDataValue('amount'))
    },
  })
  declare amount: Decimal

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(GoalRecurrence)),
    defaultValue: GoalRecurrence.MONTHLY,
  })
  declare recurrence: GoalRecurrence

  @Column({ allowNull: true })
  declare targetDate: Date

  @BelongsTo(() => User, 'userId')
  declare user: User

  @CreatedAt
  declare creationDate: Date

  @UpdatedAt
  declare updatedOn: Date

  @Index
  @DeletedAt
  declare deletionDate: Date
}
