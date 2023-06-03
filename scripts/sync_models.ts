import { connectionOptions } from '../src/services/database'
import { User } from '../src/models/user'
import { Sequelize } from 'sequelize-typescript'

const syncModels = async () => {
  const connection = new Sequelize(connectionOptions)
  await connection.sync({ alter: true })
  await User.findOrCreate({ where: { email: process.env.SEED_EMAIL } })
  await connection.close()
}

syncModels().catch((err) => {
  console.log(err)
  process.exit(1)
})
