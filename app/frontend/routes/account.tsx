import { useState } from 'react'
import * as React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { Account } from '../loaders/accounts'
import {
  Account as AccountEntity,
  AccountValidator,
} from '../entities/accounts'
import {
  buildFormValidator,
  FormError,
  FormValidator,
} from '../services/form_validations'

export const formValidator: FormValidator = async (formData: FormData) => {
  const accountValidator = new AccountValidator({
    id: (formData.get('id') as string) ?? null,
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form method="put" onChange={validate}>
      <label htmlFor={'name'}>Name</label>
      <input name="name" defaultValue={account.name} />
      {formErrors.name && (
        <span className={'bg-amber-200'}>{formErrors.name}</span>
      )}
      <label htmlFor={'amount'}>Amount</label>
      <input name="amount" defaultValue={account.amount} />
      {formErrors.amount && (
        <span className={'bg-amber-200'}>{formErrors.amount}</span>
      )}
      <label htmlFor={'debt'}>Debt</label>
      <input type={'checkbox'} name="debt" defaultChecked={account.debt} />
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form method="post" onChange={validate}>
      <label htmlFor={'name'}>Name</label>
      <input name="name" />
      {formErrors.name && (
        <span className={'bg-amber-200'}>{formErrors.name}</span>
      )}
      <label htmlFor={'amount'}>Amount</label>
      <input name="amount" />
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
