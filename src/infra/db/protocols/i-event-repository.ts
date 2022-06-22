import EventModel from '../../../domain/models/event'
import { CreateEventDto, EventDto } from './../../../domain/dtos/events'

export interface IEventRepository {
  add: (event: CreateEventDto) => Promise<EventDto>
  getAll: () => Promise<EventDto[]>
  getById: (id: number) => Promise<EventModel>
  update: (eventForUpdate: EventModel, newEvent: CreateEventDto) => Promise<EventDto>
  delete: (id: number) => Promise<void>
}
