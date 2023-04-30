import express from 'express'
import { createHash } from 'crypto'

const port = 3000
const application = express()

const cacheFingerprint = createHash('md5')
  .update(Math.random().toString())
  .digest('hex')

application.use(express.static('./public'))
application.use(express.static('./vendor'))

application.set('views', 'app/views')
application.set('view engine', 'pug')

application.locals.fingerprint = (input: string) => {
  return `${input}?v=${cacheFingerprint}`
}

application.get('/', (_req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
