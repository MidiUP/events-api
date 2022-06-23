import { UnprocessableEntityError } from '../../src/presentation/errors/unprocessable-entity-error'
import { OrderCreateValidator } from '../../src/validation/order-create-validator'

interface sutTypes {
  sut: OrderCreateValidator
}

const makeSut = (): sutTypes => {
  const sut = new OrderCreateValidator()
  return {
    sut
  }
}

describe('order create validation', () => {
  test('should return error if idEvent is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      quantityTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idEvent is a required field'))
  })

  test('should return error if idEvent is not number', async () => {
    const { sut } = makeSut()
    const req = {
      idEvent: 'not_number',
      quantityTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idEvent shold be a number'))
  })

  test('should return error if idEvent is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      idEvent: -1,
      quantityTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idEvent shold be greater than 0'))
  })

  test('should return error if quantityTickets is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      idEvent: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('quantityTickets is a required field'))
  })

  test('should return error if quantityTickets is not number', async () => {
    const { sut } = makeSut()
    const req = {
      quantityTickets: 'not_number',
      idEvent: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('quantityTickets shold be a number'))
  })

  test('should return error if quantityTickets is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      quantityTickets: -1,
      idEvent: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('quantityTickets shold be greater than 0'))
  })

  test('should return null if all right', async () => {
    const { sut } = makeSut()
    const req = {
      quantityTickets: 1,
      idEvent: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(null)
  })
})
