import { NextFunction, Router, Response, Request } from 'express'
import { DataSource } from 'typeorm'
import { Account } from '../entities/account'
import { User } from '../entities/user'
import { Database } from '../services/database'
import UserService from '../services/user'

type AccountsLocals = {
  user: User
  dataSource: DataSource
}

interface Req<T> extends Request {
  body: T
}

const accountsRouter: Router = Router({ strict: true })

// eslint-disable-next-line @typescript-eslint/no-misused-promises
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

// accountsRouter.post(
//   '/',
//   // eslint-disable-next-line @typescript-eslint/no-misused-promises
//   async (
//     req: Req<AccountFormData>,
//     res: Response<unknown, AccountsLocals>,
//     next: NextFunction
//   ) => {
//     try {
//       const accountData = new AccountForm(req.body)
//       const errors = await accountData.validate()
//
//       if (errors.length > 0) {
//         return res.status(400).send(JSON.stringify({ errors }))
//       }
//
//       const accountRepository = res.locals.dataSource.getRepository(Account)
//       const account = accountRepository.create(accountData)
//
//       account.user = res.locals.user
//       await accountRepository.save(account)
//
//       res.send(JSON.stringify(account))
//     } catch (error) {
//       next(error)
//     }
//   }
// )

accountsRouter.get(
  '/',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
accountsRouter.put('/:id', async (_req, res) => {
  await Database.getEntityManager()
  res.send(JSON.stringify({ id: '1' }))
})

export default accountsRouter
