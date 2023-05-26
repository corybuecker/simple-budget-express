import { FastifyInstance, FastifyRequest } from 'fastify'
import AuthenticatedRouteFactory from './authenticated_route_factory'
import { User } from '../models/user'
import { Account } from '../models/account'

const registerAccountsController = (application: FastifyInstance) => {
  const getAccounts = new AuthenticatedRouteFactory<Account[]>({
    url: '/api/accounts',
    method: 'GET',
    handler: async (request: FastifyRequest, _) => {
      const user = await User.findByPk(request.locals?.user.id, {
        include: 'accounts',
      })

      return user?.accounts ?? []
    },
  })

  const createAccount = new AuthenticatedRouteFactory<Account, Account>({
    url: '/api/accounts',
    method: 'POST',
    handler: async (request: FastifyRequest<{ Body: Account }>, _) => {
      const user = await User.findOne({
        where: { id: request.locals?.user.id },
        rejectOnEmpty: true,
      })

      return user?.$create<Account>('account', request.body)
    },
  })

  const getAccount = new AuthenticatedRouteFactory<
    Account,
    undefined,
    { id: string }
  >({
    url: '/api/accounts/:id',
    method: 'GET',
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      const user = await User.findOne({
        where: { id: request.locals?.user.id },
        rejectOnEmpty: true,
        include: ['accounts'],
      })

      return user?.accounts.filter((a) => a.id === request.params.id)[0]
    },
  })

  const patchAccount = new AuthenticatedRouteFactory<
    Account,
    Account,
    { id: string }
  >({
    url: '/api/accounts/:id',
    method: 'PUT',
    handler: async (
      request: FastifyRequest<{
        Body: Omit<Account, 'id' | 'user'>
        Params: { id: string }
      }>,
      _
    ) => {
      const user = await User.findOne({
        where: { id: request.locals?.user.id },
        rejectOnEmpty: true,
        include: ['accounts'],
      })

      const account = user.accounts.filter((a) => a.id === request.params.id)[0]

      account.name = request.body.name
      account.amount = request.body.amount
      account.debt = request.body.debt
      await account.save()

      return account
    },
  })

  application.route(getAccounts.authenticated())
  application.route(createAccount.authenticated())
  application.route(getAccount.authenticated())
  application.route(patchAccount.authenticated())
}

export default registerAccountsController
