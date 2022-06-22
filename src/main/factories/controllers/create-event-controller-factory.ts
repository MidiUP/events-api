import { CreateEventController } from './../../../presentation/controllers/create-event-controller'
import { EventCreateValidator } from '../../../validation/event-create-validator'
import { Controller } from '../../../presentation/protocols/controller'
import { makeEventService } from '../services/event-service-factory'

export const makeCreateEventController = (): Controller => {
  const eventCreateValidator = new EventCreateValidator()
  const eventService = makeEventService()
  return new CreateEventController(eventService, eventCreateValidator)
}
