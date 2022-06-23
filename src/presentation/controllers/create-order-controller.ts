import { Validator } from '../protocols/validator'
import { serverError, unprocessableEntity, noContent } from '../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Controller } from '../protocols/controller'
import { AbstractOrderService } from '../../domain/usecases/abstract-order-service'

export class CreateOrderController implements Controller {
  constructor (
    private readonly orderService: AbstractOrderService,
    private readonly orderValidator: Validator
  ) { }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    console.log(request.header?.infoToken) // console deixado de propósito para mostrar funcionamento da autenticação
    try {
      const errorValidator = await this.orderValidator.validate(request.body)
      if (errorValidator) {
        return unprocessableEntity(errorValidator)
      }

      const errorAvailabilityEvent = await this.orderService.checkEvent(request.body)
      if (errorAvailabilityEvent) {
        return unprocessableEntity(errorAvailabilityEvent)
      }

      await this.orderService.createOrder(request.body)
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
