import { CreateEventDto, eventDto } from './../../../domain/dtos/events'

export interface IEventRepository {
  add: (event: CreateEventDto) => Promise<eventDto>
}
