import { LoaderFunctionArgs, redirect } from 'react-router-dom'
import { FormSaving } from '../form_objects/savings'

export type Saving = FormSaving & { id: string }

export const saving = async ({ params: { savingId } }: LoaderFunctionArgs) => {
  if (!savingId) return

  const response = await fetch(`/api/savings/${savingId}`)

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as Saving
}

export const savings = async () => {
  const response = await fetch('/api/savings')

  if (response.status === 401) {
    return redirect('/authentication')
  }

  if (!response.ok) {
    throw response
  }

  return (await response.json()) as Saving[]
}
