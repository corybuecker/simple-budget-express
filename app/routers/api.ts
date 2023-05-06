import { Router } from 'express'
import { Database } from '../services/database'

const apiRouter: Router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.get('/accounts', async (_req, res) => {
  await Database.getDataSource()
  res.send(JSON.stringify([{ id: '1' }]))
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
apiRouter.get('/accounts/:id', async (_req, res) => {
  await Database.getDataSource()
  res.send(JSON.stringify({ id: '1' }))
})

export default apiRouter
