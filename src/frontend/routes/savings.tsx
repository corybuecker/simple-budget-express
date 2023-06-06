import * as React from 'react'
import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom'
import Nav from '../nav'
import {
  Saving,
  saving as savingLoader,
  savings as savingsLoader,
} from '../loaders/savings'
import { EditSaving, NewSaving } from './saving'
import { createSavingAction, updateSavingAction } from '../actions/savings'

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
export const Savings = () => {
  const savings = useLoaderData() as Saving[]
  return (
    <div>
      <Link to={'new'}>New</Link>
      {savings.map((saving) => (
        <div key={saving.id}>
          <Link to={saving.id}>Saving {saving.id}</Link>
        </div>
      ))}
    </div>
  )
}

const ErrorBoundary = () => {
  const error = useRouteError() as { data: unknown }
  const errors = JSON.stringify(error.data, null, 2)

  return <pre>{errors}</pre>
}

export const savingsRoutes = {
  path: '/savings',
  element: <Main />,
  errorElement: <ErrorBoundary />,
  children: [
    { index: true, element: <Savings />, loader: savingsLoader },
    {
      path: 'new',
      element: <NewSaving />,
      action: createSavingAction,
    },
    {
      path: ':savingId',
      element: <EditSaving />,
      loader: savingLoader,
      action: updateSavingAction,
    },
  ],
}
