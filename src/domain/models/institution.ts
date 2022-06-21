import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import CategoryInstitution from './category_institution'

@Table({ tableName: 'institution', timestamps: true })
export default class Institution extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @ForeignKey(() => CategoryInstitution)
  @Column
  id_category_institution: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @BelongsTo(() => CategoryInstitution)
  categoryInstitution: CategoryInstitution
}
