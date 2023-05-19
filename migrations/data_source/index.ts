import { DataSource } from 'typeorm'
import { dataSourceOptions } from '../../src/services/database'

export default new DataSource({
  ...dataSourceOptions,
  migrations: ['./migrations/*'],
  migrationsTableName: 'schema_migrations',
  entities: ['./src/entities/*.ts'],
})
