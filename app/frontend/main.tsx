import * as React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './nav'

const Main = (): React.JSX.Element => {
  return (
    <>
      <Nav></Nav>
      <Outlet />
    </>
  )
}

export default Main
