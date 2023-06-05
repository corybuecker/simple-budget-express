import { ValidationError } from 'class-validator/types/validation/ValidationError'
import * as React from 'react'
import { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { Goal } from '../loaders/goals'
import {
  FormGoal as GoalEntity,
  FormGoalValidator,
  GoalRecurrence,
} from '../form_objects/goals'
import {
  buildFormValidator,
  FormError,
  FormValidator,
} from '../services/form_validations'
import { plainToInstance } from 'class-transformer'

export const formValidator: FormValidator = async (
  formData: FormData
): Promise<ValidationError[]> => {
  const goalValidator = plainToInstance(
    FormGoalValidator,
    Object.fromEntries(formData)
  )

  return goalValidator.validate()
}

export const EditGoal = () => {
  const goal = useLoaderData() as Goal

  const [formErrors, setFormErrors] = useState<FormError<GoalEntity>>({})

  const validate = buildFormValidator<GoalEntity>(formValidator, setFormErrors)

  return (
    <Form
      method="put"
      onChange={validate}
      className={'flex flex-col gap-4 max-w-2xl'}
    >
      <div className={'flex flex-col'}>
        <label htmlFor={'name'} className={'font-bold'}>
          Name
        </label>
        <input
          name={'name'}
          id={'name'}
          defaultValue={goal.name}
          className={'border p-2'}
        />
        {formErrors.name && (
          <span className={'bg-amber-200'}>{formErrors.name}</span>
        )}
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'amount'} className={'font-bold'}>
          Amount
        </label>
        <input
          type={'number'}
          name={'amount'}
          id={'amount'}
          defaultValue={goal.amount}
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  )
}
export const NewGoal = () => {
  const [formErrors, setFormErrors] = useState<FormError<GoalEntity>>({})

  const validate = buildFormValidator<GoalEntity>(formValidator, setFormErrors)

  return (
    <Form method="post" onChange={validate}>
      <div>{JSON.stringify(formErrors)}</div>
      <label htmlFor={'name'}>Name</label>
      <input name="name" />
      {formErrors.name && (
        <span className={'bg-amber-200'}>{formErrors.name}</span>
      )}
      <label htmlFor={'amount'}>Amount</label>
      <input type="number" name="amount" />
      {formErrors.amount && (
        <span className={'bg-amber-200'}>{formErrors.amount}</span>
      )}
      <label htmlFor={'recurrence'}>Recurrence</label>
      <select name="recurrence">
        <option value={GoalRecurrence.NEVER}>{GoalRecurrence.NEVER}</option>
      </select>
      {formErrors.recurrence && (
        <span className={'bg-amber-200'}>{formErrors.recurrence}</span>
      )}
      <label htmlFor={'targetDate'}>Target date</label>
      <input type="date" name="targetDate" />
      {formErrors.targetDate && (
        <span className={'bg-amber-200'}>{formErrors.targetDate}</span>
      )}
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  )
}
