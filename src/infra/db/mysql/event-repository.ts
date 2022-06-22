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

  async getById (id: number): Promise<EventModel> {
    const event = await this.repositoryEvent.findOne({
      where: { id }
    })
    return event
  }

  async update (eventForUpdate: EventModel, newEvent: CreateEventDto): Promise<EventDto> {
    const eventUpdated = await (await eventForUpdate.update(newEvent)).save()
    return eventUpdated
  }

  async delete (id: number): Promise<void> {
    await this.repositoryEvent.destroy({
      where: { id }
    })
  }
}
