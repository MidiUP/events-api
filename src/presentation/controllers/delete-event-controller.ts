import { UnprocessableEntityError } from './../errors/unprocessable-entity-error'
import { noContent } from './../helpers/http-helpers'
import { Validator } from '../protocols/validator'
import { serverError, unprocessableEntity } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { AbstractEventService } from '../../domain/usecases/abstract-event-service'

export class DeleteEventController implements Controller {
  constructor (
    private readonly eventService: AbstractEventService,
    private readonly eventValidator: Validator
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.header.params
      const errorValidator = await this.eventValidator.validate({ id })
      if (errorValidator) {
        return unprocessableEntity(errorValidator)
      }

      const existsEvent = await this.eventService.getById(id)
      if (!existsEvent) {
        return unprocessableEntity(new UnprocessableEntityError('not found any event with this id'))
      }

      await this.eventService.delete(id)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
