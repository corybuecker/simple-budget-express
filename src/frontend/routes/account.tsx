import { ValidationError } from 'class-validator/types/validation/ValidationError'
import * as React from 'react'
import { useState } from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { Account } from '../loaders/accounts'
import {
  FormAccount as AccountEntity,
  FormAccountValidator,
} from '../form_objects/accounts'
import {
  buildFormValidator,
  FormError,
  FormValidator,
} from '../services/form_validations'

export const formValidator: FormValidator = async (
  formData: FormData
): Promise<ValidationError[]> => {
  const accountValidator = new FormAccountValidator({
    name: formData.get('name') as string,
    amount: Number(formData.get('amount')),
    debt: Boolean(formData.get('debt')),
  })

  return accountValidator.validate()
}

export const EditAccount = () => {
  const account = useLoaderData() as Account

  const [formErrors, setFormErrors] = useState<FormError<AccountEntity>>({})

  const validate = buildFormValidator<AccountEntity>(
    formValidator,
    setFormErrors
  )

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
          defaultValue={account.name}
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
          defaultValue={account.amount}
          className={'border p-2'}
        />
        {formErrors.amount && (
          <span className={'bg-amber-200'}>{formErrors.amount}</span>
        )}
      </div>
      <div className={'flex flex-col'}>
        <label htmlFor={'debt'}>Debt</label>
        <input
          type={'checkbox'}
          name={'debt'}
          id={'debt'}
          defaultChecked={account.debt}
          className={'w-4'}
        />
      </div>
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  )
}
export const NewAccount = () => {
  const [formErrors, setFormErrors] = useState<FormError<AccountEntity>>({})

  const validate = buildFormValidator<AccountEntity>(
    formValidator,
    setFormErrors
  )

  return (
    <Form method="post" onChange={validate}>
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
      <label htmlFor={'debt'}>Debt</label>
      <input type={'checkbox'} name="debt" />
      <button disabled={Object.values(formErrors).length > 0} type="submit">
        Save
      </button>
    </Form>
  )
}
