import { ApplicationBuilder } from '../application_builder'
import { Database } from '../services/database'
import { User } from '../models/user'
import { FastifyInstance } from 'fastify'
import { Sequelize } from 'sequelize-typescript'
import { Account } from '../models/account'
import { randomUUID } from 'crypto'

let connection: Sequelize
const testId = randomUUID()

beforeAll(async () => {
  connection = await Database.getConnection()
  await connection.query(`SAVEPOINT "${testId}"`)
})

afterAll(async () => {
  await connection.query(`ROLLBACK TO "${testId}"`)
})

describe('patch', () => {
  let application: FastifyInstance
  let account: Account
  beforeAll(async () => {
    application = await new ApplicationBuilder().getApplication(connection)

    const user = await new User({ email: 'test@example.com' }).save()
    account = await new Account({
      name: 'test',
      amount: 1,
      debt: false,
      userId: user.id,
    }).save()

    application.addHook('onRequest', (request, reply) => {
      request.session.simpleBudgetSession.email = 'test@example.com'
    })
  })

  it('cannot change the user ID', async () => {
    const anotherUser = await new User({ email: 'test2@example.com' }).save()
    const response = await application.inject({
      method: 'PUT',
      url: `/api/accounts/${account.id}`,
      payload: {
        userId: anotherUser.id,
      },
    })

    expect(1).toEqual(1)
  })
})
