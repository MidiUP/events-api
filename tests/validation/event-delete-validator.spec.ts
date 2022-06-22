import { UnprocessableEntityError } from '../../src/presentation/errors/unprocessable-entity-error'
import { EventDeleteValidator } from '../../src/validation/event-delete-validator'

interface sutTypes {
  sut: EventDeleteValidator
}

const makeSut = (): sutTypes => {
  const sut = new EventDeleteValidator()
  return {
    sut
  }
}

describe('event delete validation', () => {
  test('should return error if id is not passed', async () => {
    const { sut } = makeSut()
    const req = {}
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('id is a required field'))
  })

  test('should return error if id is not number', async () => {
    const { sut } = makeSut()
    const req = {
      id: 'not_number'

    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('id shold be a number'))
  })

  test('should return error if id is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      id: -1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('id shold be greater than 0'))
  })
})
