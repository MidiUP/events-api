import { UnprocessableEntityError } from '../../src/presentation/errors/unprocessable-entity-error'

export const errorValidateFunction = async (): Promise<Error> => {
  return new Promise(resolve => resolve(new UnprocessableEntityError('any_error')))
}
