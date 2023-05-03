import { Router } from 'express'

const apiRouter: Router = Router()

apiRouter.get('/accounts', (_req, res) => {
  res.send(JSON.stringify([{ id: 1 }]))
})

export default apiRouter
