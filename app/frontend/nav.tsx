import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <>
      <nav className="bg-slate-800">
        <div className="flex justify-between">
          <div className="flex h-14 items-center space-x-4 px-4">
            <Link to="/reports">Reports</Link>
            <Link to="/accounts">Accounts</Link>
            <Link to="/savings">Savings</Link>
            <Link to="/goals">Goals</Link>
          </div>
          <div className="flex h-14 items-center space-x-4 px-4">P</div>
        </div>
      </nav>
    </>
  )
}
export default Nav
