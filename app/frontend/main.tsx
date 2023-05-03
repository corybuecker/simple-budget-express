import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Nav from './nav'

export type Account = {
  id: number
}

const Main = () => {
  const data = useLoaderData() as Account[]

  return (
    <>
      <Nav></Nav>
      <h1>tewsst</h1>
      <Link to="/accounts">Accounts</Link>
      <>{data[0].id}</>
    </>
  )
}

export default Main
