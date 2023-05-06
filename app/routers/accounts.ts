import { Router } from 'express'
import { Account } from '../entities/account'
import { Database } from '../services/database'

const accountsRouter: Router = Router({ strict: true })
type AccountFormData = {
  name: string
}
// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.post('/', async (req, res) => {
  const accountData = req.body as AccountFormData
  const accountRepository = (await Database.getDataSource()).getRepository(
    Account
  )
  const account = accountRepository.create(accountData)
  await accountRepository.save(account)
  res.send(JSON.stringify(account))
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.get('/', async (_req, res) => {
  const accountRepository = (await Database.getDataSource()).getRepository(
    Account
  )
  const accounts = await accountRepository.find()
  res.send(JSON.stringify(accounts))
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.get('/:id', async (_req, res) => {
  await Database.getEntityManager()
  res.send(JSON.stringify({ id: '1' }))
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.put('/:id', async (_req, res) => {
  await Database.getEntityManager()
  res.send(JSON.stringify({ id: '1' }))
})

export default accountsRouter
