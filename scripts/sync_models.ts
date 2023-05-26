import { Database } from '../src/services/database'
import { User } from '../src/models/user'

const syncModels = async () => {
  const connection = await Database.getConnection()
  await connection.sync({ alter: true })
  await User.findOrCreate({ where: { email: process.env.SEED_EMAIL } })
}

syncModels().catch((err) => {
  console.log(err)
  process.exit(1)
})
