import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ErrorPage from './errors'
import Nav from './nav'
import { accountsRoutes } from './routes/accounts'
import Authentication from './routes/authentication'
import { goalsRoutes } from './routes/goals'
import { savingsRoutes } from './routes/savings'

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
  },
  { path: '/authentication', element: <Authentication /> },
  accountsRoutes,
  goalsRoutes,
  savingsRoutes,
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
