import registerAccountsController from './controllers/accounts'
import fastify from 'fastify'
import { Database } from './services/database'
import fastifySession from '@fastify/session'
import fastifyCookie from '@fastify/cookie'
import SessionStore from './services/session_store'
import { User } from './models/user'
import registerAuthenticationController from './controllers/authentication'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { compileFile } from 'pug'

type ApplicationLocals = {
  user: User
} | null

declare module 'fastify' {
  interface FastifyRequest {
    locals: ApplicationLocals
  }
}

const port = process.env.PORT || 3000
const application = fastify({
  logger: true,
})

const startServer = async () => {
  if (!process.env.COOKIE_SECRET) {
    throw Error('must set COOKIE_SECRET')
  }

  const connection = await Database.getConnection()
  await application.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
  })

  application.get('/frontend.js', async (req, reply) => {
    await reply.sendFile('frontend.js')
    return
  })

  application.get('/app.css', async (req, reply) => {
    await reply.sendFile('app.css')
    return
  })

  await application.register(fastifyCookie)
  await application.register(fastifySession, {
    cookieName: 'sessionId',
    secret: process.env.COOKIE_SECRET,
    rolling: true,
    cookie: { secure: process.env.ENV === 'production' },
    store: new SessionStore(connection),
  })

  application.addHook('onClose', (_, done) =>
    connection
      .close()
      .then(() => done())
      .catch(done)
  )

  application.decorateRequest<ApplicationLocals>('locals', null)
  application.addHook('onRequest', (request, reply, done) => {
    request.locals = null
    return done()
  })

  registerAuthenticationController(application)
  registerAccountsController(application)

  const template = compileFile('./src/views/index.pug')

  application.get('/accounts*', async (request, reply) => {
    await reply.type('text/html').send(template())
  })

  await application.listen({ port: Number(port), host: '0.0.0.0' })
}

startServer().catch((err) => {
  application.log.error(err)
  process.exit(1)
})
