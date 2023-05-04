import React from 'react'
import { LoaderFunctionArgs, Params, useLoaderData } from 'react-router-dom'

export type Account = {
  id: string
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
export const Account = () => {
  const account = useLoaderData() as Account
  return <div>{account.id}</div>
}
