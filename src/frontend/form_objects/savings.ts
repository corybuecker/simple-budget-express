import { IsNumber, Length, Min, validate } from 'class-validator'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

export interface FormSaving {
  name: string
  amount: number
}

export class FormSavingValidator {
  @Length(1, 255)
  public name: string

  @IsNumber()
  @Min(1)
  public amount: number

  constructor({ name, amount }: FormSaving) {
    this.name = name
    this.amount = amount
  }

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true })
  }
}
