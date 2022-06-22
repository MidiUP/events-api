import { noContent } from './../../../src/presentation/helpers/http-helpers'
import { DeleteEventController } from './../../../src/presentation/controllers/delete-event-controller'
import { errorValidateFunction } from '../../helpers/error-validate-mock'
import { UnprocessableEntityError } from '../../../src/presentation/errors/unprocessable-entity-error'
import { IEventRepository } from '../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from '../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import { Validator } from '../../../src/presentation/protocols/validator'
import dateMock from '../../helpers/date-mock'
import { unprocessableEntity, serverError } from '../../../src/presentation/helpers/http-helpers'
import { throwErrorFunction } from '../../helpers/throw-error-mock'

interface SutTypes {
  sut: DeleteEventController
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
    getAll: () => Promise<EventDto[]>

    async add (event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }

    async update (id: number, event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }

    async delete (id: number): Promise<void> {}
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
  const sut = new DeleteEventController(eventService, eventValidator)
  return { sut, eventValidator, eventService }
}

describe('delete event controller', () => {
  test('shold return unprocessable entity if validate return error', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: 'any_body'
    }
    const { sut, eventValidator } = makeSut()
    jest.spyOn(eventValidator, 'validate').mockImplementationOnce(errorValidateFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
  })

  test('shold return server error if validate throw error', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: 'any_body'
    }
    const { sut, eventValidator } = makeSut()
    jest.spyOn(eventValidator, 'validate').mockImplementationOnce(throwErrorFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('validator shold be called with correct params', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: {
        any_key: 'any_value'
      }
    }
    const { sut, eventValidator } = makeSut()
    const spyEventValidator = jest.spyOn(eventValidator, 'validate')
    await sut.handle(request)
    expect(spyEventValidator).toHaveBeenCalledWith({ id: request.header.params.id })
  })

  test('service delete shold be called with correct params', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: {
        any_key: 'any_value'
      }
    }
    const { sut, eventService } = makeSut()
    const spyEventService = jest.spyOn(eventService, 'delete')
    await sut.handle(request)
    expect(spyEventService).toHaveBeenCalledWith(request.header.params.id)
  })

  test('shold return server error if service throw error', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: {
        any_key: 'any_value'
      }
    }
    const { sut, eventService } = makeSut()
    jest.spyOn(eventService, 'delete').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return succes if all right', async () => {
    const request = {
      header: {
        params: { id: 0 }
      },
      body: {
        any_key: 'any_value'
      }
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(noContent())
  })
})