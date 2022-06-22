import { Validator } from '../presentation/protocols/validator'
import * as yup from 'yup'
import { UnprocessableEntityError } from '../presentation/errors/unprocessable-entity-error'

export class EventUpdateValidator implements Validator {
  private readonly schema = yup.object().shape({
    name: yup.string().required('name is a required field').typeError('name shold be a string'),
    dateHour: yup.date().required('dateHour is a required field').typeError('dateHour shold be a date'),
    availableTickets: yup.number().required('availableTickets is a required field').typeError('availableTickets shold be a number').min(1, 'availableTickets shold be greater than 0'),
    soldTickets: yup.number().required('soldTickets is a required field').typeError('soldTickets shold be a number').min(1, 'soldTickets shold be greater than 0'),
    idInstitution: yup.number().required('idInstitution is a required field').typeError('idInstitution shold be a number').min(1, 'idInstitution shold be greater than 0'),
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
