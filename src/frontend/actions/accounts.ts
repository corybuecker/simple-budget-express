import { ActionFunctionArgs } from 'react-router-dom'
import { Account } from '../entities/accounts'

const mapValidatedFormDataToObject = (
  formData: FormData
): { id: string | undefined; name: string; amount: number; debt: boolean } => {
  return {
    id: (formData.get('id') as string) ?? undefined,
    name: formData.get('name') as string,
    amount: Number(formData.get('amount')),
    debt: Boolean(formData.get('debt')),
  }
}

const create = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify(
      mapValidatedFormDataToObject(await request.formData())
    ),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw Error('cannot save account')
  }

  return (await response.json()) as Account
}

const update = async ({ request, params }: ActionFunctionArgs) => {
  if (!params?.accountId) {
    throw Error('missing account ID')
  }

  const response = await fetch(`/api/accounts/${params.accountId}`, {
    method: 'put',
    body: JSON.stringify(
      mapValidatedFormDataToObject(await request.formData())
    ),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw Error('cannot save account')
  }

  return (await response.json()) as Account
}

export { create as createAccountAction, update as updateAccountAction }
