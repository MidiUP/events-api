import { IEventRepository } from './../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, eventDto } from './../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import dateMock from '../../helpers/date-mock'

interface SutTypes {
  sut: AbstractEventService
  eventRepository: IEventRepository
}

const mockEventDto: eventDto = {
  id: 0,
  available_tickets: 0,
  date_hour: dateMock,
  name: 'any_name',
  sold_tickets: 0
}

const mockCreateEventDto: CreateEventDto = {
  available_tickets: 0,
  date_hour: dateMock,
  name: 'any_name',
  sold_tickets: 0,
  id_institution: 0
}

const makeEventRepository = (): IEventRepository => {
  class EventRepositoryStub implements IEventRepository {
    async add (event: CreateEventDto): Promise<eventDto> {
      return new Promise(resolve => resolve(mockEventDto))
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
