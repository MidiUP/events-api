import { errorValidateFunction } from './../../helpers/error-validate-mock'
import { UnprocessableEntityError } from './../../../src/presentation/errors/unprocessable-entity-error'
import { IEventRepository } from './../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, eventDto } from './../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import { CreateEventController } from '../../../src/presentation/controllers/create-event-controller'
import { Validator } from '../../../src/presentation/protocols/validator'
import dateMock from '../../helpers/date-mock'
import { unprocessableEntity } from '../../../src/presentation/helpers/http-helpers'

interface SutTypes {
  sut: CreateEventController
  eventValidator: Validator
  eventService: AbstractEventService
}

const mockEventDto: eventDto = {
  id: 0,
  available_tickets: 0,
  date_hour: dateMock,
  name: 'any_name',
  sold_tickets: 0
}

const makeEventValidator = (): Validator => {
  class EventValidatorStub implements Validator {
    async validate (body: any): Promise<Error> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new EventValidatorStub()
}

const makeEventRepository = (): IEventRepository => {
  class EventRepositoryStub implements IEventRepository {
    async add (event: CreateEventDto): Promise<eventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }
  }

  return new EventRepositoryStub()
}

const makeEventService = (): AbstractEventService => {
  class EventServiceStub extends AbstractEventService {
    async create (body: any): Promise<eventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }
  }

  return new EventServiceStub(makeEventRepository())
}

const makeSut = (): SutTypes => {
  const eventValidator = makeEventValidator()
  const eventService = makeEventService()
  const sut = new CreateEventController(eventService, eventValidator)
  return { sut, eventValidator, eventService }
}

describe('create event controller', () => {
  test('shold return unprocessable entity if validate return error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, eventValidator } = makeSut()
    jest.spyOn(eventValidator, 'validate').mockImplementationOnce(errorValidateFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
  })
})
