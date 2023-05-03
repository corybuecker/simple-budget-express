import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './nav.js'

const Main = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet />
    </>
  )
}

export default Main
