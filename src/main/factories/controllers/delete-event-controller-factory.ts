import { EventDeleteValidator } from './../../../validation/event-delete-validator'
import { DeleteEventController } from './../../../presentation/controllers/delete-event-controller'
import { makeEventService } from '../services/event-service-factory'

export const makeDeleteEventController = (): DeleteEventController => {
  const eventUpdateValidator = new EventDeleteValidator()
  const eventService = makeEventService()
  return new DeleteEventController(eventService, eventUpdateValidator)
}
