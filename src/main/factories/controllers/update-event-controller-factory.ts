import { makeEventService } from '../services/event-service-factory'
import { UpdateEventController } from '../../../presentation/controllers/update-event-controller'
import { EventUpdateValidator } from '../../../validation/event-update-validator'

export const makeUpdateEventController = (): UpdateEventController => {
  const eventUpdateValidator = new EventUpdateValidator()
  const eventService = makeEventService()
  return new UpdateEventController(eventService, eventUpdateValidator)
}
