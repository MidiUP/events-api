import { errorValidateFunction } from '../../helpers/error-validate-mock'
import { UnprocessableEntityError } from '../../../src/presentation/errors/unprocessable-entity-error'
import { IEventRepository } from '../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from '../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import { CreateEventController } from '../../../src/presentation/controllers/create-event-controller'
import { Validator } from '../../../src/presentation/protocols/validator'
import dateMock from '../../helpers/date-mock'
import { unprocessableEntity, serverError, success } from '../../../src/presentation/helpers/http-helpers'
import { throwErrorFunction } from '../../helpers/throw-error-mock'
import event from '../../../src/domain/models/event'

interface SutTypes {
  sut: CreateEventController
  eventValidator: Validator
  eventService: AbstractEventService
}

const mockEventDto: EventDto = {
  id: 0,
  availableTickets: 0,
  dateHour: dateMock,
  name: 'any_name',
  soldTickets: 0
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
    getByFilters: (filters: any) => Promise<EventDto[]>
    getById: (id: number) => Promise<event>
    update: (eventForUpdate: event, newEvent: CreateEventDto) => Promise<EventDto>
    delete: (id: number) => Promise<void>
    getAll: () => Promise<EventDto[]>
    async add (event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }
  }

  return new EventRepositoryStub()
}

const makeEventService = (): AbstractEventService => {
  class EventServiceStub extends AbstractEventService {
    async create (body: any): Promise<EventDto> {
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

  test('shold return server error if validate throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, eventValidator } = makeSut()
    jest.spyOn(eventValidator, 'validate').mockImplementationOnce(throwErrorFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('validator shold be called with correct params', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, eventValidator } = makeSut()
    const spyEventValidator = jest.spyOn(eventValidator, 'validate')
    await sut.handle(request)
    expect(spyEventValidator).toHaveBeenCalledWith(request.body)
  })

  test('shold return server error if service throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, eventService } = makeSut()
    jest.spyOn(eventService, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return succes if all right', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(success(mockEventDto))
  })
})
