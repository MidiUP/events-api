import { FindWithFilterEventValidator } from './../../../validation/find-with-filter-event-validator'
import { FindWithFilterEventController } from '../../../presentation/controllers/find-with-filter-event-controller'
import { makeEventService } from '../services/event-service-factory'

export const makeFindWithFilterEventController = (): FindWithFilterEventController => {
  const eventService = makeEventService()
  const makeFindWithFilterValidator = new FindWithFilterEventValidator()
  return new FindWithFilterEventController(makeFindWithFilterValidator, eventService)
}
