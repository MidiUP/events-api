import { EventDto } from './../dtos/events'
import { IEventRepository } from '../../infra/db/protocols/i-event-repository'
import { CreateEventDto } from '../dtos/events'

export abstract class AbstractEventService {
  constructor (
    private readonly eventRepository: IEventRepository
  ) {}

  async create (event: CreateEventDto): Promise<EventDto> {
    return await this.eventRepository.add(event)
  }

  async getAll (): Promise<EventDto[]> {
    return await this.eventRepository.getAll()
  }

  async update (id: number, event: CreateEventDto): Promise<EventDto> {
    return await this.eventRepository.update(id, event)
  }

  async delete (id: number): Promise<void> {
    await this.eventRepository.delete(id)
  }
}
