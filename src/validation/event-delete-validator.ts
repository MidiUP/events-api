import { Validator } from '../presentation/protocols/validator'
import * as yup from 'yup'
import { UnprocessableEntityError } from '../presentation/errors/unprocessable-entity-error'

export class EventDeleteValidator implements Validator {
  private readonly schema = yup.object().shape({
    id: yup.number().required('id is a required field').typeError('id shold be a number').min(1, 'id shold be greater than 0')
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
