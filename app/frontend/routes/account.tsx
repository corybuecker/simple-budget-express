import * as React from 'react'
import { Form, useLoaderData } from 'react-router-dom'
import { Account } from '../loaders/accounts'

export const EditAccount = () => {
  const account = useLoaderData() as Account
  return (
    <Form method="put">
      <label htmlFor={'name'}>Name</label>
      <input name="name" value={account.name} />
      <label htmlFor={'amount'}>Amount</label>
      <input name="amount" value={account.amount} />
      <button type="submit">Save</button>
    </Form>
  )
}
export const NewAccount = () => {
  return (
    <Form method="post">
      <label htmlFor={'name'}>Name</label>
      <input name="name" />
      <label htmlFor={'amount'}>Amount</label>
      <input name="amount" />
      <label htmlFor={'debt'}>Debt</label>
      <input type={'checkbox'} name="debt" />
      <button type="submit">Save</button>
    </Form>
  )
}
