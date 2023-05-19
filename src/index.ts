import express from 'express'
import { createHash } from 'crypto'
import { Session } from './entities/session'
import accountsRouter from './routers/accounts'
import authenticationRouter from './routers/authentication'
import { TypeormStore } from 'connect-typeorm'
import { Database } from './services/database'
import ExpressSession from 'express-session'

const port = process.env.PORT || 3000
const application = express()
const sessionStore = new TypeormStore({ cleanupLimit: 0 })
const cacheFingerprint = createHash('md5')
  .update(Math.random().toString())
  .digest('hex')

application.use(express.json())

application.use(express.static('./public'))
application.use(express.static('./static'))

application.locals.fingerprint = (input: string) => {
  return `${input}?v=${cacheFingerprint}`
}

application.set('views', 'src/views')
application.set('view engine', 'pug')

Database.getDataSource()
  .then((dataSource) => {
    if (process.env.COOKIE_SECRET === undefined) {
      throw Error('must set COOKIE_SECRET')
    }

    sessionStore.connect(dataSource.getRepository(Session))
    application.use(
      ExpressSession({
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        secret: [process.env.COOKIE_SECRET],
      })
    )
    application.use('/api/accounts', accountsRouter)
    application.use('/authentication', authenticationRouter)

    application.get(
      [
        '/',
        '/accounts',
        '/accounts/*',
        '/goals',
        '/savings',
        '/reports',
        '/authentication',
      ],
      (_req, res) => {
        return res.render('index')
      }
    )

    application.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  })
  .catch((error) => console.log(error))
