import { makeEventService } from './event-service-factory'
import { OrderService } from './../../../domain/services/order-service'
import { AbstractOrderService } from '../../../domain/usecases/abstract-order-service'

export const makeOrderService = (): AbstractOrderService => {
  const EventService = makeEventService()
  return new OrderService(EventService)
}
