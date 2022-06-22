import { EventDto } from './../dtos/events'
import { IEventRepository } from '../../infra/db/protocols/i-event-repository'
import { CreateEventDto } from '../dtos/events'

export abstract class AbstractEventService {
  constructor (
    private readonly eventRepository: IEventRepository
  ) {}

  async create (event: CreateEventDto): Promise<EventDto> {
    return this.eventRepository.add(event)
  }
}