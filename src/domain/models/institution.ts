import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import CategoryInstitution from './category-institution'

@Table({ tableName: 'institution', timestamps: true })
export default class InstitutionModel extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @ForeignKey(() => CategoryInstitution)
  @Column
  idCategoryInstitution: number

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date

  @BelongsTo(() => CategoryInstitution)
  categoryInstitution: CategoryInstitution
}
