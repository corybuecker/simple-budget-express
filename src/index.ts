import express from "express"

const application = express()
const port = 3000

application.get('/', (req, res) => {
  res.send('Hello World!')
})

application.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})