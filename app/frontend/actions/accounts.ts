import { ActionFunctionArgs } from 'react-router-dom'
import { Account, AccountValidator } from '../entities/accounts'

const create = async ({ request }: ActionFunctionArgs) => {
  // await formDataToValidator(await request.formData())
  // const formData = (await request.formData()) as unknown as Iterable<
  //   [keyof AccountFormData, FormDataEntryValue]
  // >
  //
  // const data = Object.fromEntries(formData)
  // console.log(data)
  // const response = await fetch(`/api/accounts`, {
  //   method: 'post',
  //   body: JSON.stringify(data),
  //   headers: { 'Content-Type': 'application/json' },
  // })
  //
  // return (await response.json()) as Account
}

const update = async ({ request }: ActionFunctionArgs) => {
  const response = await fetch(`/api/accounts`, {
    method: 'post',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  })
  return (await response.json()) as Account
}

export { create as createAccountAction, update as updateAccountAction }
