import { DataSource } from 'typeorm'
import { dataSourceOptions } from '../../app/services/database'

export default new DataSource({
  ...dataSourceOptions,
  migrations: ['./migrations/*'],
  migrationsTableName: 'schema_migrations',
  entities: ['./app/entities/*.ts'],
})
