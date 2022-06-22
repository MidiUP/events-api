import { ReadEventController } from './../../../src/presentation/controllers/read-event-controller'
import { serverError, success } from './../../../src/presentation/helpers/http-helpers'
import { IEventRepository } from './../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from './../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import dateMock from '../../helpers/date-mock'

interface SutTypes {
  sut: ReadEventController
  eventService: AbstractEventService
}

const mockEventDto: EventDto = {
  id: 0,
  availableTickets: 0,
  dateHour: dateMock,
  name: 'any_name',
  soldTickets: 0
}

const makeEventRepository = (): IEventRepository => {
  class EventRepositoryStub implements IEventRepository {
    update: (id: number, event: CreateEventDto) => Promise<EventDto>
    async getAll (): Promise<EventDto[]> {
      return new Promise(resolve => resolve([mockEventDto]))
    }

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
  const eventService = makeEventService()
  const sut = new ReadEventController(eventService)
  return { sut, eventService }
}

describe('create event controller', () => {
  test('shold return server error if service throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, eventService } = makeSut()
    jest.spyOn(eventService, 'getAll').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
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
    expect(response).toEqual(success([mockEventDto]))
  })
})
