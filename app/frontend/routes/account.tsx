import React from 'react'
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  Params,
  useLoaderData,
} from 'react-router-dom'

export type Account = {
  id: string
  name: string
  amount: number
}

export const accountLoader = async ({
  params: { accountId },
}: LoaderFunctionArgs) => {
  if (accountId === undefined) {
    throw new Error('missing account id')
  }
  const rawAccount = await fetch(`/api/accounts/${accountId}`)
  return (await rawAccount.json()) as Account
}

export const createAction = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData())

  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
  return (await response.json()) as Account
}

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
