import InstitutionModel from '../../../../domain/models/institution'
import CategoryInstitutionModel from '../../../../domain/models/category-institution'
import { Op } from 'sequelize'

export const makeFiltersOption = (attributes: any): any => {
  const { date, dates, institution, categoryInstitution } = attributes
  let conditionsWhere: any

  if (dates) {
    conditionsWhere = {
      ...conditionsWhere,
      dateHour: {
        [Op.between]: [dates[0], dates[1]]
      }
    }
  }
  if (date) {
    conditionsWhere = {
      ...conditionsWhere,
      dateHour: {
        [Op.gte]: date
      }
    }
  }

  const conditionsInclude = institution || categoryInstitution
    ? [
        {
          model: InstitutionModel,
          where: institution ? { id: institution } : { idCategoryInstitution: categoryInstitution },
          attributes: ['id', 'name'],
          include: [{
            model: CategoryInstitutionModel,
            attributes: ['id', 'name']
          }]
        }
      ]
    : [
        {
          model: InstitutionModel,
          attributes: ['id', 'name'],
          include: [{
            model: CategoryInstitutionModel,
            attributes: ['id', 'name']
          }]
        }
      ]

  return { where: conditionsWhere, include: conditionsInclude }
}
