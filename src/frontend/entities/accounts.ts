import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsUUID,
  Length,
  Min,
  validate,
} from 'class-validator'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

export type Account = {
  id?: string
  name: string
  amount: number
  debt: boolean
}

export class AccountValidator {
  @IsOptional()
  @IsUUID()
  public id: string | undefined

  @Length(1, 255)
  public name: string

  @IsNumber()
  @Min(1)
  public amount: number

  @IsOptional()
  @IsBoolean()
  public debt: boolean

  constructor({ id, name, amount, debt }: Account) {
    this.id = id
    this.name = name
    this.amount = amount
    this.debt = debt ?? false
  }

  public async validate(): Promise<ValidationError[]> {
    return validate(this)
  }
}
