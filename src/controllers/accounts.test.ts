import { ApplicationBuilder } from '../application_builder'
import { User } from '../models/user'
import { FastifyInstance } from 'fastify'
import { Account } from '../models/account'
import { connectionOptions } from '../services/database'
import { Sequelize } from 'sequelize-typescript'

const connection = new Sequelize({
  ...connectionOptions,
  logQueryParameters: true,
})

beforeAll(async () => {
  await connection.query('BEGIN')
})

afterEach(async () => {
  await connection.query('ROLLBACK')
  await connection.close()
})

describe('patch', () => {
  let application: FastifyInstance
  let account: Account
  let user: User

  beforeAll(async () => {
    application = await new ApplicationBuilder().getApplication()

    user = await new User({ email: 'test@example.com' }).save()
    account = await user.$create<Account>('account', {
      name: 'test',
      amount: 1,
      debt: false,
    })

    application.addHook('onRequest', (request, reply, done) => {
      request.session.simpleBudgetSession = { email: 'test@example.com' }
      return done()
    })
  })

  it('cannot change the user ID', async () => {
    const anotherUser = await new User({ email: 'test2@example.com' }).save()
    const response = await application.inject({
      method: 'PUT',
      url: `/api/accounts/${account.id}`,
      payload: {
        name: 'test',
        amount: 2,
        debt: false,
        userId: anotherUser.id,
      },
    })
    expect(response.statusCode).toEqual(200)
    await account.reload({ include: User })
    expect(account.user.id).toEqual(user.id)
    expect(account.amount.equals(2)).toBeTruthy()
  })
})
