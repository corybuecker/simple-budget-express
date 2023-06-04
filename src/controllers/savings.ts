import { FastifyInstance, FastifyRequest } from 'fastify'
import AuthenticatedRouteFactory from './authenticated_route_factory'
import { Saving } from '../models/saving'
import { FormSaving, FormSavingValidator } from '../form_objects/savings'

const registerSavingsController = (application: FastifyInstance) => {
  const getSavings = new AuthenticatedRouteFactory<Saving[]>({
    url: '/api/savings',
    method: 'GET',
    handler: async (request: FastifyRequest, _) => {
      return request.locals.user.savings ?? []
    },
    additionalRelationsForUser: Saving,
  })

  const createSaving = new AuthenticatedRouteFactory<Saving | void>({
    url: '/api/savings',
    method: 'POST',
    handler: async (request: FastifyRequest<{ Body: FormSaving }>, reply) => {
      const savingValidator = new FormSavingValidator(request.body)
      const errors = await savingValidator.validate()

      if (errors.length > 0) {
        throw { error: errors }
      }

      return request.locals.user.$create<Saving>('saving', request.body)
    },
    errorHandler: async (error, request, reply) => {
      await reply.code(400).send(error)
    },
  })

  const getSaving = new AuthenticatedRouteFactory<Saving>({
    url: '/api/savings/:id',
    method: 'GET',
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      const saving = request.locals.user.savings.find(
        (a) => a.id === request.params.id
      )
      if (!saving) throw { error: 'not found' }
      return saving
    },
    additionalRelationsForUser: Saving,
    errorHandler: async (error, request, reply) => {
      await reply.code(404).send(error)
    },
  })

  const patchSaving = new AuthenticatedRouteFactory<Saving>({
    url: '/api/savings/:id',
    method: 'PUT',
    handler: async (
      request: FastifyRequest<{
        Body: FormSaving
        Params: { id: string }
      }>,
      _
    ) => {
      const savingValidator = new FormSavingValidator(request.body)
      const errors = await savingValidator.validate()

      if (errors.length > 0) throw errors

      const saving = request.locals.user.savings.filter(
        (a) => a.id === request.params.id
      )[0]
      await saving.setAttributes(savingValidator).save()
      return saving
    },
    additionalRelationsForUser: Saving,
  })

  application.route(getSavings.authenticated())
  application.route(createSaving.authenticated())
  application.route(getSaving.authenticated())
  application.route(patchSaving.authenticated())
}

export default registerSavingsController
