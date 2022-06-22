import { serverError, success } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { AbstractEventService } from '../../domain/usecases/abstract-event-service'

export class ReadEventController implements Controller {
  constructor (
    private readonly eventService: AbstractEventService
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const events = await this.eventService.getAll()
      return success(events)
    } catch (error) {
      return serverError(error)
    }
  }
}
