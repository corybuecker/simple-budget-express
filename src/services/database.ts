import { Sequelize } from 'sequelize-typescript'
import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options'
import { Account } from '../models/account'
import { User } from '../models/user'
import { Session } from '../models/session'

export const connectionOptions: SequelizeOptions = {
  dialect: 'sqlite',
  storage: './database.sqlite',
  models: [Account, User, Session],
}

export class Database {
  private static connection: Sequelize

  private constructor() {
    throw new Error()
  }

  static async getConnection() {
    if (!this.connection) {
      this.connection = new Sequelize(connectionOptions)
    }

    await this.connection.databaseVersion()

    return this.connection
  }
}
