import { ReadEventController } from '../../../presentation/controllers/read-event-controller'
import { makeEventService } from '../services/event-service-factory'

export const makeReadEventController = (): ReadEventController => {
  const eventService = makeEventService()
  return new ReadEventController(eventService)
}
