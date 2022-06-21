import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({ tableName: 'user', timestamps: true })
export default class User extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @Column
  email: string

  @Column
  password: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
