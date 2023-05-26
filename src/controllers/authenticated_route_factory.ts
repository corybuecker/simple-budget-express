import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '../models/user'

type UnauthenticatedRoute<ResponseT, BodyT, ParamsT> = {
  method: 'GET' | 'POST' | 'PUT'
  url: string
  handler: (
    request: FastifyRequest<{ Body: BodyT; Params: ParamsT }>,
    reply: FastifyReply
  ) => Promise<ResponseT>
}

export type AuthenticatedRoute<ResponseT, BodyT, ParamsT> =
  UnauthenticatedRoute<ResponseT, BodyT, ParamsT> & {
    preHandler: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }

class AuthenticatedRouteFactory<
  ResponseT,
  BodyT = undefined,
  ParamsT = undefined
> {
  constructor(
    private readonly route: UnauthenticatedRoute<ResponseT, BodyT, ParamsT>
  ) {}

  public authenticated(): AuthenticatedRoute<ResponseT, BodyT, ParamsT> {
    return {
      url: this.route.url,
      method: this.route.method,
      preHandler: this.generatePreHandler(),
      handler: this.route.handler,
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
