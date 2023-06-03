import {
  IsBoolean,
  IsNumber,
  IsOptional,
  Length,
  Min,
  validate,
} from 'class-validator'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

export interface FormAccount {
  name: string
  amount: number
  debt: boolean
}

export class FormAccountValidator {
  @Length(1, 255)
  public name: string

  @IsNumber()
  @Min(1)
  public amount: number

  @IsOptional()
  @IsBoolean()
  public debt: boolean

  constructor({ name, amount, debt }: FormAccount) {
    this.name = name
    this.amount = amount
    this.debt = debt ?? false
  }

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true })
  }
}
