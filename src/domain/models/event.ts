import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Institution from './institution'

@Table({ tableName: 'event', timestamps: true })
export default class EventModel extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @Column
  dateHour: Date

  @Column
  availableTickets: number

  @Column
  soldTickets: number

  @ForeignKey(() => Institution)
  @Column
  idInstitution: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @BelongsTo(() => Institution)
  institution: Institution
}
