import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../models/user'
import { Account } from '../models/account'
import { ModelStatic } from 'sequelize/types/model'
import { Saving } from '../models/saving'
import { Goal } from '../models/goal'

export type PossibleRelations = ModelStatic<Account | Saving | Goal>

type UnauthenticatedRoute<T> = {
  method: 'GET' | 'POST' | 'PUT'
  url: string
  handler: (
    request: FastifyRequest<{ Body: any; Params: { id: string } }>,
    reply: FastifyReply
  ) => Promise<T>
  additionalRelationsForUser?: PossibleRelations
  errorHandler?: (
    error: Error,
    request: FastifyRequest,
    reply: FastifyReply
  ) => Promise<void>
}

export type AuthenticatedRoute<T> = Omit<
  UnauthenticatedRoute<T>,
  'additionalRelationsForUser'
> & {
  preHandler: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
}

class AuthenticatedRouteFactory<T> {
  constructor(private readonly route: UnauthenticatedRoute<T>) {}

  public authenticated(): AuthenticatedRoute<T> {
    return {
      url: this.route.url,
      method: this.route.method,
      preHandler: this.generatePreHandler(),
      handler: this.route.handler,
      errorHandler: this.route.errorHandler,
    }
  }

  private generatePreHandler() {
    return async (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> => {
      if (!request.session.simpleBudgetSession?.email) {
        await reply.code(401).send({ error: 'not authorized' })
        return
      }

      const user = await User.findOne({
        where: { email: request.session.simpleBudgetSession?.email },
        include: this.route.additionalRelationsForUser,
      })

      if (!user) {
        await reply.code(401).send({ error: 'not authorized' })
        return
      }

      request.locals = { user }
    }
  }
}

export default AuthenticatedRouteFactory
