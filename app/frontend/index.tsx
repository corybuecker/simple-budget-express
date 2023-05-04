import ErrorPage from './errors.js'
import Main from './main.js'
import React, { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Accounts } from './routes/accounts.js'

const mainElements = document.getElementsByTagName('main')
const mainElement = mainElements.item(0)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/accounts',
    element: <Main />,
    children: [{ index: true, element: <Accounts /> }],
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

const Router = () => {
  return
}

export default Router

if (mainElement) {
  createRoot(mainElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}
