import { UnprocessableEntityError } from './../../presentation/errors/unprocessable-entity-error'
import { RequestOrderEventDto } from './../dtos/order'
import { AbstractEventService } from './abstract-event-service'

export abstract class AbstractOrderService {
  constructor (
    private readonly eventService: AbstractEventService
  ) {}

  async createOrder (requestOrderEvent: RequestOrderEventDto): Promise<void> {
    await this.eventService.sellerTicketEvent(requestOrderEvent.idEvent, requestOrderEvent.quantityTickets)
  }

  async checkEvent (requestOrderEvent: RequestOrderEventDto): Promise<Error> {
    const event = await this.eventService.getById(requestOrderEvent.idEvent)
    if (!event) {
      return new UnprocessableEntityError(`not found event with id ${requestOrderEvent.idEvent}`)
    }
    const availableTickets = event.availableTickets - event.soldTickets
    if (availableTickets < requestOrderEvent.quantityTickets) {
      return new UnprocessableEntityError(`the amount of tickets requested is greater than the amount of tickets available. Tickets available: ${availableTickets}`)
    }

    return null
  }
}
