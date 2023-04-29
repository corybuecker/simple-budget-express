import express from 'express'

const port = 3000

const application = express()
application.use(express.static('./public'))

application.set('views', 'app/views')
application.set('view engine', 'pug')

application.get('/', (_req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
