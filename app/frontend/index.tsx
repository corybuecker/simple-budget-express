import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Main from './main.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
  },
])
const mainElement = document.getElementsByTagName('main')
const root = createRoot(mainElement[0])

root.render(
  <>
    <RouterProvider router={router} />
  </>
)
