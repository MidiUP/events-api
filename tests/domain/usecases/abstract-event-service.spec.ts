import { IEventRepository } from './../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from './../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import dateMock from '../../helpers/date-mock'

interface SutTypes {
  sut: AbstractEventService
  eventRepository: IEventRepository
}

const mockEventDto: EventDto = {
  id: 0,
  availableTickets: 0,
  dateHour: dateMock,
  name: 'any_name',
  soldTickets: 0
}

const mockCreateEventDto: CreateEventDto = {
  availableTickets: 0,
  dateHour: dateMock,
  name: 'any_name',
  soldTickets: 0,
  idInstitution: 0
}

const makeEventRepository = (): IEventRepository => {
  class EventRepositoryStub implements IEventRepository {
    async add (event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }

    async getAll (): Promise<EventDto[]> {
      return new Promise(resolve => resolve([mockEventDto]))
    }
  }

  return new EventRepositoryStub()
}

const makeSut = (): SutTypes => {
  class EventService extends AbstractEventService {}

  const eventRepository = makeEventRepository()

  return { sut: new EventService(eventRepository), eventRepository }
}

describe('AbstractEventService create', () => {
  test('eventRepository add shold be called with correct params', async () => {
    const { sut, eventRepository } = makeSut()
    const spyEventRepository = jest.spyOn(eventRepository, 'add')
    await sut.create(mockCreateEventDto)
    expect(spyEventRepository).toHaveBeenCalledWith(mockCreateEventDto)
  })

  test('shold return mockEventDto if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.create(mockCreateEventDto)
    expect(response).toEqual(mockEventDto)
  })
})

describe('AbstractEventService getAll', () => {
  test('eventRepository getAll shold be called with correct params', async () => {
    const { sut, eventRepository } = makeSut()
    const spyEventRepository = jest.spyOn(eventRepository, 'getAll')
    await sut.getAll()
    expect(spyEventRepository).toHaveBeenCalledWith()
  })

  test('shold return [mockEventDto] if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.getAll()
    expect(response).toEqual([mockEventDto])
  })
})
