import { LoaderFunctionArgs, redirect } from 'react-router-dom'

export type Account = {
  id: string
  name: string
  amount: number
  debt: boolean
}

export const account = async ({
  params: { accountId },
}: LoaderFunctionArgs) => {
  if (accountId === undefined) {
    throw new Error('missing account id')
  }

  const rawAccount = await fetch(`/api/accounts/${accountId}`)
  return (await rawAccount.json()) as Account
}

export const accounts = async () => {
  const rawAccounts = await fetch('/api/accounts')

  if (rawAccounts.status === 401) {
    return redirect('/authentication')
  }

  return (await rawAccounts.json()) as Account[]
}
