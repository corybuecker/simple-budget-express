import ErrorPage from './errors.js'
import Main from './main.js'
import React, { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {
  accountLoader,
  createAction as accountCreateAction,
  EditAccount,
  NewAccount,
} from './routes/account.js'
import { Accounts, accountsLoader } from './routes/accounts.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/accounts',
    element: <Main />,
    children: [
      { index: true, element: <Accounts />, loader: accountsLoader },
      {
        path: 'new',
        element: <NewAccount />,
        action: accountCreateAction,
      },
      {
        path: ':accountId',
        element: <EditAccount />,
        loader: accountLoader,
        action: accountCreateAction,
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
