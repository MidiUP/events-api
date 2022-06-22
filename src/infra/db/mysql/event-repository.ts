import { formatEventDto } from './../helpers/format-event-dto'
import { sequelize } from '../../../data/sequelize'
import { CreateEventDto, EventDto } from '../../../domain/dtos/events'
import EventModel from '../../../domain/models/event'
import { IEventRepository } from '../protocols/i-event-repository'

export class EventRepository implements IEventRepository {
  private readonly repositoryEvent = sequelize.getRepository(EventModel)

  async add (event: CreateEventDto): Promise<EventDto> {
    const newEvent = await this.repositoryEvent.create(event)
    const newEventDto = formatEventDto(newEvent)
    return newEventDto
  }
}
