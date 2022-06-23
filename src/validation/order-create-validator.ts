import { Validator } from '../presentation/protocols/validator'
import * as yup from 'yup'
import { UnprocessableEntityError } from '../presentation/errors/unprocessable-entity-error'

export class OrderCreateValidator implements Validator {
  private readonly schema = yup.object().shape({
    idEvent: yup.number().required('idEvent is a required field').typeError('idEvent shold be a number').min(1, 'idEvent shold be greater than 0'),
    quantityTickets: yup.number().required('quantityTickets is a required field').typeError('quantityTickets shold be a number').min(1, 'quantityTickets shold be greater than 0')
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
