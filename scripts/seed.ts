import { DataSource } from 'typeorm'
import { User } from '../app/entities/user'
import { dataSourceOptions } from '../app/services/database'

const seedEmail = process.env.SEED_EMAIL || 'example@example.com'

const seed = async () => {
  const dataSource = new DataSource({
    ...dataSourceOptions,
    entities: ['./app/entities/*.ts'],
  })

  const repo = (await dataSource.initialize()).getRepository(User)
  const existingUser = await repo.findOneBy({ email: seedEmail })

  if (!existingUser) {
    const user = repo.create({ email: seedEmail })
    await repo.save(user)
  }
}

void seed().then(() => console.log('database seeded'))
