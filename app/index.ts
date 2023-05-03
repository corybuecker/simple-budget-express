import express from 'express'
import { createHash } from 'crypto'
import apiRouter from './routers/api'
import ImportMapGenerator from './import_map_generator'

const port = process.env.PORT || 3000
const application = express()
const cacheFingerprint = createHash('md5')
  .update(Math.random().toString())
  .digest('hex')

application.use(express.static('./public'))
application.use(express.static('./vendor'))

application.locals.fingerprint = (input: string) => {
  return `${input}?v=${cacheFingerprint}`
}
const importMapGenerater: ImportMapGenerator = new ImportMapGenerator()
application.locals.importMap = importMapGenerater.toString()

application.set('views', 'app/views')
application.set('view engine', 'pug')
application.use('/api', apiRouter)

application.get(
  ['/', '/accounts', '/goals', '/savings', '/reports'],
  (_req, res) => {
    res.render('index')
  }
)

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
