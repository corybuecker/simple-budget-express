import { ApplicationBuilder } from './application_builder'

const applicationBuilder = new ApplicationBuilder()

applicationBuilder
  .getApplication()
  .then((application) => {
    return application.listen({ port: 3000, host: '0.0.0.0' })
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
