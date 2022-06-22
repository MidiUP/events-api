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

  async getAll (): Promise<EventDto[]> {
    const events = await this.repositoryEvent.findAll()
    return events
  }

  async update (id: number, newEvent: CreateEventDto): Promise<EventDto> {
    const existsEvent = await this.repositoryEvent.findOne({
      where: {
        id
      }
    })
    if (!existsEvent) {
      throw new Error() // mapear
    }

    const eventUpdated = await (await existsEvent.update(newEvent)).save()

    return eventUpdated
  }
}
