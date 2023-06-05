import { ActionFunctionArgs } from 'react-router-dom'
import { FormSaving } from '../form_objects/savings'

const create = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/savings`, {
    method: 'post',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as FormSaving
}

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params.savingId) return

  const response = await fetch(`/api/savings/${params.savingId}`, {
    method: 'put',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as FormSaving
}

export { create as createSavingAction, update as updateSavingAction }
