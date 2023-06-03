import { ApplicationBuilder } from './application_builder'
import { Sequelize } from 'sequelize-typescript'
import { connectionOptions } from './services/database'

const applicationBuilder = new ApplicationBuilder()

new Sequelize(connectionOptions)

applicationBuilder
  .getApplication()
  .then((application) => {
    return application.listen({ port: 3000, host: '0.0.0.0' })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
