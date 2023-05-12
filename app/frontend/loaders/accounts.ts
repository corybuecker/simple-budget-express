import { LoaderFunctionArgs } from 'react-router-dom'

export type Account = {
  id: string
  name: string
  amount: number
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
  const rawAccounts: Response = await fetch('/api/accounts')

  return (await rawAccounts.json()) as Account[]
}
