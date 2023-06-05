import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { FormGoal } from '../form_objects/goals'

export type Goal = FormGoal & { id: string }

export const goal = async ({ params: { goalId } }: LoaderFunctionArgs) => {
  if (!goalId) return

  const response = await fetch(`/api/goals/${goalId}`)

  return (await response.json()) as Goal
}

export const goals = async () => {
  const response = await fetch('/api/goals')

  if (response.status === 401) {
    return redirect('/authentication')
  }

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as Goal[]
}
