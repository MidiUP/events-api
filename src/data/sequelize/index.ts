import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config'
import path from 'path'

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  storage: ':memory:',
  models: [path.resolve(__dirname, '../', '../', 'domain', 'models')],
  logging: false
})
