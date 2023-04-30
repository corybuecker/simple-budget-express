import ErrorPage from './errors'
import Main, { Account } from './main'
import React, { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

const mainElements = document.getElementsByTagName('main')
const mainElement = mainElements.item(0)

const rootLoader = async () => {
  const rawResponse: Response = await fetch('/api/accounts')
  return (await rawResponse.json()) as Account[]
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: '/accounts',
    element: <Main />,
    loader: rootLoader,
    children: [],
    errorElement: <ErrorPage />,
  },
  {
    path: '/savings',
    element: <Main />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: '/goals',
    element: <Main />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: '/reports',
    element: <Main />,
    loader: rootLoader,
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
