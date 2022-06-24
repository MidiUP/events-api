import { IEventRepository } from './../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from './../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import dateMock from '../../helpers/date-mock'
import EventModel from '../../../src/domain/models/event'

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
    getByFilters: (filters: any) => Promise<EventDto[]>
    async getById (id: number): Promise<EventModel> {
      return new Promise(resolve => resolve(mockEventDto as EventModel))
    }

    async delete (id: number): Promise<void> {}

    async sellerTicketEvent (id: number): Promise<void> {}

    async update (eventForUpdate: EventModel, event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }

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

describe('AbstractEventService update', () => {
  test('shold return mockEventDto if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.update(mockEventDto as EventModel, mockCreateEventDto)
    expect(response).toEqual(mockEventDto)
  })
})

describe('AbstractEventService delete', () => {
  test('eventRepository delete shold be called with correct params', async () => {
    const { sut, eventRepository } = makeSut()
    const spyEventRepository = jest.spyOn(eventRepository, 'delete')
    const mockId = 1
    await sut.delete(mockId)
    expect(spyEventRepository).toHaveBeenCalledWith(mockId)
  })

  test('shold return noContent if all right', async () => {
    const { sut } = makeSut()
    const mockId = 1
    const response = await sut.delete(mockId)
    expect(response).toEqual(undefined)
  })
})

describe('AbstractEventService sellerTicketEvent', () => {
  test('eventRepository getById sellerTicketEvent shold be called with correct params', async () => {
    const { sut, eventRepository } = makeSut()
    const spyEventRepositoryGetById = jest.spyOn(eventRepository, 'getById')
    const mockId = 1
    const mockSelledTickets = 1
    await sut.sellerTicketEvent(mockId, mockSelledTickets)
    expect(spyEventRepositoryGetById).toHaveBeenCalledWith(mockId)
  })

  test('eventRepository update sellerTicketEvent shold be called with correct params', async () => {
    const { sut, eventRepository } = makeSut()
    const spyEventRepositoryUpdate = jest.spyOn(eventRepository, 'update')
    const mockId = 1
    const mockSelledTickets = 1
    await sut.sellerTicketEvent(mockId, mockSelledTickets)
    expect(spyEventRepositoryUpdate).toHaveBeenCalledWith(mockEventDto, { ...mockEventDto, soldTickets: 1 })
  })

  test('shold return noContent if all right', async () => {
    const { sut } = makeSut()
    const mockId = 1
    const mockSelledTickets = 1
    const response = await sut.sellerTicketEvent(mockId, mockSelledTickets)
    expect(response).toEqual(undefined)
  })
})
