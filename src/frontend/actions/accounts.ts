import { ActionFunctionArgs } from 'react-router-dom'
import { FormAccount, FormAccountValidator } from '../form_objects/accounts'
import { plainToInstance } from 'class-transformer'

const create = async ({ request }: ActionFunctionArgs) => {
  const data = plainToInstance(
    FormAccountValidator,
    Object.fromEntries(await request.formData())
  )
  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw Error('cannot save account')
  }

  return (await response.json()) as FormAccount
}

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params?.accountId) {
    throw Error('missing account ID')
  }

  const response = await fetch(`/api/accounts/${params.accountId}`, {
    method: 'put',
    body: JSON.stringify(Object.fromEntries(await request.formData())),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw Error('cannot save account')
  }

  return (await response.json()) as FormAccount
}

export { create as createAccountAction, update as updateAccountAction }
