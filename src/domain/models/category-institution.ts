import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'

@Table({ tableName: 'category_institution', timestamps: true })
export default class CategoryInstitutionModel extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number

  @Column
  name: string

  @CreatedAt
  createdAt: Date

  @UpdatedAt
  updatedAt: Date
}
