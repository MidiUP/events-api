import { makeOrderService } from './../services/order-service-factory'
import { OrderCreateValidator } from './../../../validation/order-create-validator'
import { Controller } from '../../../presentation/protocols/controller'
import { CreateOrderController } from '../../../presentation/controllers/create-order-controller'

export const makeCreateOrderController = (): Controller => {
  const orderCreateValidator = new OrderCreateValidator()
  const orderService = makeOrderService()
  return new CreateOrderController(orderService, orderCreateValidator)
}
