import * as React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { Account } from '../loaders/accounts'

export const Accounts = () => {
  const accounts = useLoaderData() as Account[]
  return (
    <div>
      <Link to={'new'}>New</Link>
      {accounts.map((account) => (
        <div key={account.id}>
          <Link to={account.id}>Account {account.id}</Link>
        </div>
      ))}
    </div>
  )
}
