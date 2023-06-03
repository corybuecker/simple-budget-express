import { FastifyInstance, FastifyRequest } from 'fastify'
import AuthenticatedRouteFactory from './authenticated_route_factory'
import { Account } from '../models/account'
import { FormAccount, FormAccountValidator } from '../form_objects/accounts'

const registerAccountsController = (application: FastifyInstance) => {
  const getAccounts = new AuthenticatedRouteFactory<Account[]>({
    url: '/api/accounts',
    method: 'GET',
    handler: async (request: FastifyRequest, _) => {
      return request.locals.user.accounts ?? []
    },
    additionalRelationsForUser: Account,
  })

  const createAccount = new AuthenticatedRouteFactory<Account | void>({
    url: '/api/accounts',
    method: 'POST',
    handler: async (request: FastifyRequest<{ Body: FormAccount }>, reply) => {
      const accountValidator = new FormAccountValidator(request.body)
      const errors = await accountValidator.validate()

      if (errors.length > 0) {
        throw { error: errors }
      }

      return request.locals.user.$create<Account>('account', request.body)
    },
    errorHandler: async (error, request, reply) => {
      await reply.code(400).send(error)
    },
  })

  const getAccount = new AuthenticatedRouteFactory<Account>({
    url: '/api/accounts/:id',
    method: 'GET',
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      const account = request.locals.user.accounts.find(
        (a) => a.id === request.params.id
      )
      if (!account) throw { error: 'not found' }
      return account
    },
    additionalRelationsForUser: Account,
    errorHandler: async (error, request, reply) => {
      await reply.code(404).send(error)
    },
  })

  const patchAccount = new AuthenticatedRouteFactory<Account>({
    url: '/api/accounts/:id',
    method: 'PUT',
    handler: async (
      request: FastifyRequest<{
        Body: FormAccount
        Params: { id: string }
      }>,
      _
    ) => {
      const accountValidator = new FormAccountValidator(request.body)
      const errors = await accountValidator.validate()

      if (errors.length > 0) throw errors

      const account = request.locals.user.accounts.filter(
        (a) => a.id === request.params.id
      )[0]
      await account.setAttributes(accountValidator).save()
      return account
    },
    additionalRelationsForUser: Account,
  })

  application.route(getAccounts.authenticated())
  application.route(createAccount.authenticated())
  application.route(getAccount.authenticated())
  application.route(patchAccount.authenticated())
}

export default registerAccountsController
