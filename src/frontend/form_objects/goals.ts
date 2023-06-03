import { IsNumber, Length, Min, validate } from 'class-validator'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

enum GoalRecurrence {
  NEVER = 'never',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export interface FormGoal {
  name: string
  amount: number
  recurrence: GoalRecurrence
  targetDate: Date
}

export class FormGoalValidator {
  @Length(1, 255)
  public name: string

  @IsNumber()
  @Min(1)
  public amount: number

  constructor({ name, amount }: FormGoal) {
    this.name = name
    this.amount = amount
  }

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true })
  }
}
