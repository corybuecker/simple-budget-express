import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Account } from './account'

export type Accounts = Account[]

export const accountsLoader = async () => {
  const rawAccounts: Response = await fetch('/api/accounts')

  return (await rawAccounts.json()) as Account[]
}
export const Accounts = () => {
  const accounts = useLoaderData() as Account[]
  return (
    <div>
      {accounts.map((account) => (
        <div key={account.id}>
          <Link to={account.id}>Account {account.id}</Link>
        </div>
      ))}
    </div>
  )
}
