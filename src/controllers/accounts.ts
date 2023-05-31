import { FastifyInstance, FastifyRequest } from 'fastify'
import AuthenticatedRouteFactory from './authenticated_route_factory'
import { User } from '../models/user'
import { Account } from '../models/account'
import { AccountValidator } from '../frontend/entities/accounts'

export type AccountsControllerRequestTypes = {
  Body: Account
  Params: { id: string }
}

const registerAccountsController = (application: FastifyInstance) => {
  const getAccounts = new AuthenticatedRouteFactory<Account[]>({
    url: '/api/accounts',
    method: 'GET',
    handler: async (request: FastifyRequest, _) => {
      return request.locals.user.accounts ?? []
    },
    additionalRelationsForUser: ['accounts'],
  })

  const createAccount = new AuthenticatedRouteFactory<Account | Error>({
    url: '/api/accounts',
    method: 'POST',
    handler: async (request: FastifyRequest<{ Body: Account }>, _) => {
      const accountValidator = new AccountValidator(request.body)

      if ((await accountValidator.validate()).length > 0) {
        throw Error('account is not valid')
      }

      return request.locals.user.$create<Account>('account', request.body)
    },
    additionalRelationsForUser: ['accounts'],
  })

  const getAccount = new AuthenticatedRouteFactory<Account>({
    url: '/api/accounts/:id',
    method: 'GET',
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      const user = await User.findOne({
        where: { id: request.locals.user?.id },
        rejectOnEmpty: true,
        include: ['accounts'],
      })

      return user.accounts.filter((a) => a.id === request.params.id)[0]
    },
    additionalRelationsForUser: ['accounts'],
  })

  const patchAccount = new AuthenticatedRouteFactory<Account>({
    url: '/api/accounts/:id',
    method: 'PUT',
    handler: async (
      request: FastifyRequest<{
        Body: Omit<Account, 'id' | 'user'>
        Params: { id: string }
      }>,
      _
    ) => {
      const account = request.locals.user.accounts.filter(
        (a) => a.id === request.params.id
      )[0]

      account.name = request.body.name
      account.amount = request.body.amount
      account.debt = request.body.debt
      await account.save()

      return account
    },
    additionalRelationsForUser: ['accounts'],
  })

  application.route(getAccounts.authenticated())
  application.route(createAccount.authenticated())
  application.route(getAccount.authenticated())
  application.route(patchAccount.authenticated())
}

export default registerAccountsController
