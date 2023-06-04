import { SessionStore as ISessionStore } from '@fastify/session'
import EventEmitter from 'events'
import { Session as FastifySession } from 'fastify'
import { Session as SessionModel } from '../models/session'
import { Op } from 'sequelize'

const SESSION_LIFETIME = 10 * 1000 * 60

export type SimpleBudgetSession = {
  email?: string
  nonce?: string
}

declare module 'fastify' {
  export interface Session {
    simpleBudgetSession: SimpleBudgetSession
  }
}

export default class SessionStore
  extends EventEmitter
  implements ISessionStore
{
  constructor() {
    super()
  }

  public async get(
    sessionId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (err: unknown, rawSessionData?: any) => void
  ) {
    try {
      const sessionData = await this.fetchUnexpiredSession(sessionId)

      callback(
        null,
        !sessionData ? null : { simpleBudgetSession: sessionData.json }
      )
    } catch (e) {
      callback(e, null)
    }
  }

  public async set(
    sessionId: string,
    sessionData: FastifySession,
    callback: (err: unknown) => void
  ) {
    try {
      await this.createSession(sessionId, sessionData)

      callback(null)
    } catch (e) {
      callback(e)
    }
  }

  public destroy(sessionId: string, callback: (err: unknown) => void) {
    callback(null)
  }

  private async fetchUnexpiredSession(sessionId: string) {
    return SessionModel.findOne({
      where: { sessionId, expiredAt: { [Op.gt]: new Date() } },
    })
  }

  private async createSession(
    sessionId: string,
    { simpleBudgetSession }: FastifySession
  ) {
    const currentTime = new Date()
    const newExpiration = new Date(currentTime.getTime() + SESSION_LIFETIME)

    const session = await SessionModel.findOne({
      where: { sessionId, expiredAt: { [Op.gt]: new Date() } },
    })

    if (!session) {
      await SessionModel.create({
        sessionId,
        json: simpleBudgetSession,
        expiredAt: newExpiration,
      })
    } else {
      session.json = simpleBudgetSession
      session.expiredAt = newExpiration
      await session.save()
    }
  }
}
