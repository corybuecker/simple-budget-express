import { IsNumber, IsPositive, Length, validate } from 'class-validator'
import { ValidationError } from 'class-validator/types/validation/ValidationError'
import { Transform } from 'class-transformer'

export interface FormSaving {
  name: string
  amount: number
}

export class FormSavingValidator {
  @Length(1, 255)
  public declare name: string

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  public declare amount: number

  public async validate(): Promise<ValidationError[]> {
    return validate(this, { whitelist: true, forbidNonWhitelisted: true })
  }
}
