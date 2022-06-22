import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config'
import path from 'path'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  storage: ':memory:',
  models: [path.resolve(__dirname, '../', '../', 'domain', 'models')],
  logging: false
})
