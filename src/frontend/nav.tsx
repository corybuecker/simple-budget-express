import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = (): React.JSX.Element => {
  const inactiveClass = [
    'text-white',
    'hover:bg-slate-600',
    'px-3',
    'py-2',
    'rounded-md',
    'text-sm',
  ].join(' ')

  const activeClass = [
    'bg-slate-600',
    'text-white',
    'px-3',
    'py-2',
    'rounded-md',
    'text-sm',
  ].join(' ')

  return (
    <nav className="bg-slate-800">
      <div className="flex justify-between">
        <div className="flex h-14 items-center space-x-4 px-4">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Reports
          </NavLink>
          <NavLink
            to={'/accounts'}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Accounts
          </NavLink>
          <NavLink
            to={'/savings'}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Savings
          </NavLink>
          <NavLink
            to={'/goals'}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Goals
          </NavLink>
          <NavLink to={'/authentication'}>Auth</NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Nav
