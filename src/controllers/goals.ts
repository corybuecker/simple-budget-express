import { FastifyInstance, FastifyRequest } from 'fastify'
import AuthenticatedRouteFactory from './authenticated_route_factory'
import { Goal } from '../models/goal'
import { FormGoal, FormGoalValidator } from '../form_objects/goals'

const registerGoalsController = (application: FastifyInstance) => {
  const getGoals = new AuthenticatedRouteFactory<Goal[]>({
    url: '/api/goals',
    method: 'GET',
    handler: async (request: FastifyRequest, _) => {
      return request.locals.user.goals ?? []
    },
    additionalRelationsForUser: Goal,
  })

  const createGoal = new AuthenticatedRouteFactory<Goal | void>({
    url: '/api/goals',
    method: 'POST',
    handler: async (request: FastifyRequest<{ Body: FormGoal }>, reply) => {
      const goalValidator = new FormGoalValidator(request.body)
      const errors = await goalValidator.validate()

      if (errors.length > 0) {
        throw { error: errors }
      }

      return request.locals.user.$create<Goal>('goal', request.body)
    },
    errorHandler: async (error, request, reply) => {
      await reply.code(400).send(error)
    },
  })

  const getGoal = new AuthenticatedRouteFactory<Goal>({
    url: '/api/goals/:id',
    method: 'GET',
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, _) => {
      const goal = request.locals.user.goals.find(
        (a) => a.id === request.params.id
      )
      if (!goal) throw { error: 'not found' }
      return goal
    },
    additionalRelationsForUser: Goal,
    errorHandler: async (error, request, reply) => {
      await reply.code(404).send(error)
    },
  })

  const patchGoal = new AuthenticatedRouteFactory<Goal>({
    url: '/api/goals/:id',
    method: 'PUT',
    handler: async (
      request: FastifyRequest<{
        Body: FormGoal
        Params: { id: string }
      }>,
      _
    ) => {
      const goalValidator = new FormGoalValidator(request.body)
      const errors = await goalValidator.validate()

      if (errors.length > 0) throw errors

      const goal = request.locals.user.goals.filter(
        (a) => a.id === request.params.id
      )[0]
      await goal.setAttributes(goalValidator).save()
      return goal
    },
    additionalRelationsForUser: Goal,
  })

  application.route(getGoals.authenticated())
  application.route(createGoal.authenticated())
  application.route(getGoal.authenticated())
  application.route(patchGoal.authenticated())
}

export default registerGoalsController
