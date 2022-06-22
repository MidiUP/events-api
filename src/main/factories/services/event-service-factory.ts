import { EventService } from '../../../domain/services/event-service'
import { EventRepository } from '../../../infra/db/mysql/event-repository'
import { AbstractEventService } from '../../../domain/usecases/abstract-event-service'

export const makeEventService = (): AbstractEventService => {
  const eventRepository = new EventRepository()
  return new EventService(eventRepository)
}
