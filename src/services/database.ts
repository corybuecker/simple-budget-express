import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'

export const dataSourceOptions: DataSourceOptions = {
  database: './database.sqlite',
  entities: ['./dist/src/entities/*.js', './src/entities/*.ts'],
  logging: true,
  synchronize: false,
  type: 'sqlite',
}

export class Database {
  private static dataSource: DataSource

  private constructor() {
    throw new Error()
  }

  static async getDataSource() {
    if (Database.dataSource === undefined) {
      Database.dataSource = new DataSource(dataSourceOptions)
    }

    if (!Database.dataSource.isInitialized) {
      await Database.dataSource.initialize()
    }

    return Database.dataSource
  }

  static async getEntityManager() {
    const dataSource = await Database.getDataSource()

    return dataSource.manager
  }
}
