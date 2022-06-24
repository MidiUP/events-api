import { Validator } from '../presentation/protocols/validator'
import * as yup from 'yup'
import { UnprocessableEntityError } from '../presentation/errors/unprocessable-entity-error'

export class FindWithFilterEventValidator implements Validator {
  private readonly schema = yup.object().shape({
    institution: yup.number().integer('institution shold be integer').min(1, 'institution shold be greater than 0').typeError('institution shold be a number'),
    categoryInstitution: yup.number().integer('categoryInstitution shold be integer').min(1, 'categoryInstitution shold be greater than 0').typeError('categoryInstitution shold be a number'),
    date: yup.date().typeError('date shold be a date'),
    dates: yup.array().of(yup.date().typeError('date shold be a date'))
  })

  async validate (input: any): Promise<Error> {
    return new Promise(resolve => {
      this.schema.validate(input)
        .then(res => {
          resolve(null)
        })
        .catch(err => {
          resolve(new UnprocessableEntityError(err.errors))
        })
    })
  }
}
