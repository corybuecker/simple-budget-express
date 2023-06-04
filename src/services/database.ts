import { SequelizeOptions } from 'sequelize-typescript/dist/sequelize/sequelize/sequelize-options'
import { Account } from '../models/account'
import { User } from '../models/user'
import { Session } from '../models/session'
import { Saving } from '../models/saving'
import { Goal } from '../models/goal'

export const connectionOptions: SequelizeOptions = {
  dialect: 'postgres',
  host: 'localhost',
  models: [Account, User, Session, Saving, Goal],
}
