import { Validator } from './../protocols/validator'
import { serverError, success, unprocessableEntity } from './../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { AbstractEventService } from '../../domain/usecases/abstract-event-service'

export class CreateEventController implements Controller {
  constructor (
    private readonly eventService: AbstractEventService,
    private readonly eventValidator: Validator
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const errorValidator = await this.eventValidator.validate(request.body)
      if (errorValidator) {
        return unprocessableEntity(errorValidator)
      }
      const newEvent = await this.eventService.create(request.body)
      return success(newEvent)
    } catch (error) {
      return serverError(error)
    }
  }
}
