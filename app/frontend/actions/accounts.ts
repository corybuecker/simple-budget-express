import { ActionFunctionArgs } from 'react-router-dom'
import { Account } from '../loaders/accounts'

const create = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  })
  return (await response.json()) as Account
}

const update = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  })
  return (await response.json()) as Account
}

export { create as createAccountAction, update as updateAccountAction }
