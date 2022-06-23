import { UnprocessableEntityError } from './../../src/presentation/errors/unprocessable-entity-error'
import { EventCreateValidator } from './../../src/validation/event-create-validator'

interface sutTypes {
  sut: EventCreateValidator
}

const makeSut = (): sutTypes => {
  const sut = new EventCreateValidator()
  return {
    sut
  }
}

describe('event create validation', () => {
  test('should return error if name is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      dateHour: '06/19/1999',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('name is a required field'))
  })

  test('should return error if dateHour is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('dateHour is a required field'))
  })

  test('should return error if dateHour is not date', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: 'invalid_date',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('dateHour shold be a date'))
  })

  test('should return error if availableTickets is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('availableTickets is a required field'))
  })

  test('should return error if availableTickets is not number', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 'not_number',
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('availableTickets shold be a number'))
  })

  test('should return error if availableTickets is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: -1,
      soldTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('availableTickets shold be greater than 0'))
  })

  test('should return error if soldTickets is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('soldTickets is a required field'))
  })

  test('should return error if soldTickets is not number', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: 'not_number',
      availableTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('soldTickets shold be a number'))
  })

  test('should return error if soldTickets is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: -1,
      availableTickets: 1,
      idInstitution: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('soldTickets shold be greater than 0'))
  })

  test('should return error if idInstitution is not passed', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 1,
      soldTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idInstitution is a required field'))
  })

  test('should return error if idInstitution is not number', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      idInstitution: 'not_number',
      availableTickets: 1,
      soldTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idInstitution shold be a number'))
  })

  test('should return error if idInstitution is not greater than 0', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      idInstitution: -1,
      availableTickets: 1,
      soldTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(new UnprocessableEntityError('idInstitution shold be greater than 0'))
  })

  test('should return null if all right', async () => {
    const { sut } = makeSut()
    const req = {
      name: 'any_name',
      dateHour: '06/19/1999',
      idInstitution: 1,
      availableTickets: 1,
      soldTickets: 1
    }
    const result = await sut.validate(req)
    expect(result).toEqual(null)
  })
})
