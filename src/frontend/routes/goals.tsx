import * as React from 'react'
import { Link, Outlet, useLoaderData, useRouteError } from 'react-router-dom'
import Nav from '../nav'
import {
  Goal,
  goal as goalLoader,
  goals as goalsLoader,
} from '../loaders/goals'
import { EditGoal, NewGoal } from './goal'
import { createGoalAction, updateGoalAction } from '../actions/goals'

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
const ErrorBoundary = () => {
  const error = useRouteError() as { data: unknown }
  const errors = JSON.stringify(error.data, null, 2)

  return <pre>{errors}</pre>
}

export const Goals = () => {
  const goals = useLoaderData() as Goal[]
  return (
    <div>
      <Link to={'new'}>New</Link>
      {goals.map((goal) => (
        <div key={goal.id}>
          <Link to={goal.id}>Goal {goal.id}</Link>
        </div>
      ))}
    </div>
  )
}
export const goalsRoutes = {
  path: '/goals',
  element: <Main />,
  errorElement: <ErrorBoundary />,
  children: [
    { index: true, element: <Goals />, loader: goalsLoader },
    {
      path: 'new',
      element: <NewGoal />,
      action: createGoalAction,
    },
    {
      path: ':goalId',
      element: <EditGoal />,
      loader: goalLoader,
      action: updateGoalAction,
    },
  ],
}
