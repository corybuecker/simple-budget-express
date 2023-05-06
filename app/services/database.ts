import 'reflect-metadata'
import { DataSource } from 'typeorm'

export class Database {
  private static dataSource: DataSource

  private constructor() {
    throw new Error()
  }

  static getDataSource() {
    if (Database.dataSource === undefined) {
      Database.dataSource = new DataSource({
        database: './database.sqlite',
        entities: ['../entities/*'],
        logging: true,
        migrations: ['./migrations/*'],
        migrationsTableName: 'schema_migrations',
        synchronize: false,
        type: 'sqlite',
      })
    }

    return Database.dataSource
  }

  static async getEntityManager() {
    const dataSource = Database.getDataSource()

    if (!dataSource.isInitialized) {
      await dataSource.initialize()
    }

    return dataSource.manager
  }
}
