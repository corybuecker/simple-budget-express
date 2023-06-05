import { ActionFunctionArgs } from 'react-router-dom'
import { FormGoal } from '../form_objects/goals'

const create = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/goals`, {
    method: 'post',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as FormGoal
}

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params.goalId) return

  const response = await fetch(`/api/goals/${params.goalId}`, {
    method: 'put',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as FormGoal
}

export { create as createGoalAction, update as updateGoalAction }
