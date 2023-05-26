import * as React from 'react'
import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { createAccountAction, updateAccountAction } from '../actions/accounts'
import ErrorPage from '../errors'
import {
  account as accountLoader,
  Account,
  accounts as accountsLoader,
} from '../loaders/accounts'
import Nav from '../nav'
import { EditAccount, NewAccount } from './account'
const Main = () => {
  return (
    <>
      <Nav></Nav>
      <div className={'p-2'}>
        <Outlet />
      </div>
    </>
  )
}
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
export const accountsRoutes = {
  path: '/accounts',
  element: <Main />,
  children: [
    { index: true, element: <Accounts />, loader: accountsLoader },
    {
      path: 'new',
      element: <NewAccount />,
      action: createAccountAction,
    },
    {
      path: ':accountId',
      element: <EditAccount />,
      loader: accountLoader,
      action: updateAccountAction,
    },
  ],
  errorElement: <ErrorPage />,
}
