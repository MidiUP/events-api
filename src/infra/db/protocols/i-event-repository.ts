import { CreateEventDto, EventDto } from './../../../domain/dtos/events'

export interface IEventRepository {
  add: (event: CreateEventDto) => Promise<EventDto>
  getAll: () => Promise<EventDto[]>
}
