import { unprocessableEntity } from './../helpers/http-helpers'
import { Validator } from './../protocols/validator'
import { serverError, success } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { AbstractEventService } from '../../domain/usecases/abstract-event-service'

export class FindWithFilterEventController implements Controller {
  constructor (
    private readonly findWithFilterValidator: Validator,
    private readonly eventService: AbstractEventService
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { date, ...query } = request.header.query

      if (date) {
        if (Array.isArray(date)) {
          query.dates = date
        } else {
          query.date = date
        }
      }

      const errorValidator = await this.findWithFilterValidator.validate(query)
      if (errorValidator) {
        return unprocessableEntity(errorValidator)
      }
      const eventsFiltered = await this.eventService.getEventsByFilters(query)
      return success(eventsFiltered)
    } catch (error) {
      return serverError(error)
    }
  }
}
