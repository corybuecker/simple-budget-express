import { NextFunction, Router, Response, Request, Locals } from 'express'
import * as core from 'express-serve-static-core'
import { DataSource } from 'typeorm'
import { Account } from '../entities/account'
import { User } from '../entities/user'
import { Database } from '../services/database'
import UserService from '../services/user'
import { Account as AccountFormData } from '../frontend/entities/accounts'

type AccountsLocals = {
  user: User
  dataSource: DataSource
}

interface Req<T> extends Request {
  body: T
}

const accountsRouter: Router = Router({ strict: true })

accountsRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userInfo) {
      return res.status(401).send(JSON.stringify({ error: 'not authorized' }))
    }

    const userService = new UserService(
      req.session.userInfo?.email,
      await Database.getDataSource()
    )

    res.locals = {
      user: await userService.getLoggedInUser(),
      dataSource: await Database.getDataSource(),
    } as AccountsLocals

    next()
  } catch (error) {
    next(error)
  }
})

accountsRouter.put(
  '/:id',
  async (
    req: Req<Account>,
    res: Response<unknown, AccountsLocals>,
    next: NextFunction
  ) => {
    try {
      const account = res.locals.user.accounts.find(
        (a) => a.id === req.params.id
      )

      if (!account) throw Error('cannot find account')

      account.amount = req.body.amount
      account.name = req.body.name
      account.debt = req.body.debt

      const accountRepository = res.locals.dataSource.getRepository(Account)

      res.send(JSON.stringify(await accountRepository.save(account)))
    } catch (error) {
      next(error)
    }
  }
)

accountsRouter.post(
  '/',
  async (
    req: Req<Account>,
    res: Response<unknown, AccountsLocals>,
    next: NextFunction
  ) => {
    try {
      const accountRepository = res.locals.dataSource.getRepository(Account)
      const account = accountRepository.create(req.body)

      account.user = res.locals.user
      await accountRepository.save(account)

      res.send(JSON.stringify(account))
    } catch (error) {
      next(error)
    }
  }
)

accountsRouter.get(
  '/',
  async (_req, res: Response<unknown, AccountsLocals>, next: NextFunction) => {
    try {
      const accountRepository = res.locals.dataSource.getRepository(Account)
      res.send(JSON.stringify(await accountRepository.find()))
    } catch (error) {
      next(error)
    }
  }
)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.get('/:id', (req: Request<{ id: string }>, res) => {
  const user = res.locals.user as User
  res.send(JSON.stringify(user.accounts.find((a) => a.id === req.params.id)))
})

export default accountsRouter
