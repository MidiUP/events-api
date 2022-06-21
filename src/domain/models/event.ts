import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Institution from './institution'

@Table({ tableName: 'event', timestamps: true })
export default class Event extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @Column
  date_hour: Date

  @Column
  available_tickets: number

  @Column
  sold_tickets: number

  @ForeignKey(() => Institution)
  @Column
  id_institution: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @BelongsTo(() => Institution)
  institution: Institution
}
