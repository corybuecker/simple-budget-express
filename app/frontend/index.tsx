import { StrictMode } from 'react'
import ErrorPage from './errors'
import Main from './main'
import * as React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { EditAccount, NewAccount } from './routes/account'
import {
  accounts as accountsLoader,
  account as accountLoader,
} from './loaders/accounts'
import { Accounts } from './routes/accounts'
import { createAccountAction, updateAccountAction } from './actions/accounts'
import Authentication from './routes/authentication'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  { path: '/authentication', element: <Authentication /> },
  {
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
  },
  {
    path: '/savings',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/goals',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
])

const mainElements = document.getElementsByTagName('main')
const mainElement = mainElements.item(0)

if (mainElement) {
  createRoot(mainElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
