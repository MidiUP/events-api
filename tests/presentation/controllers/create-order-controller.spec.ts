import { RequestOrderEventDto } from './../../../src/domain/dtos/order'
import { CreateOrderController } from './../../../src/presentation/controllers/create-order-controller'
import { errorValidateFunction } from '../../helpers/error-validate-mock'
import { UnprocessableEntityError } from '../../../src/presentation/errors/unprocessable-entity-error'
import { IEventRepository } from '../../../src/infra/db/protocols/i-event-repository'
import { CreateEventDto, EventDto } from '../../../src/domain/dtos/events'
import { AbstractEventService } from '../../../src/domain/usecases/abstract-event-service'
import { Validator } from '../../../src/presentation/protocols/validator'
import dateMock from '../../helpers/date-mock'
import { unprocessableEntity, serverError, noContent } from '../../../src/presentation/helpers/http-helpers'
import { throwErrorFunction } from '../../helpers/throw-error-mock'
import event from '../../../src/domain/models/event'
import { AbstractOrderService } from '../../../src/domain/usecases/abstract-order-service'

interface SutTypes {
  sut: CreateOrderController
  orderValidator: Validator
  orderService: AbstractOrderService
}

const mockEventDto: EventDto = {
  id: 0,
  availableTickets: 0,
  dateHour: dateMock,
  name: 'any_name',
  soldTickets: 0
}

const makeOrderValidator = (): Validator => {
  class OrderValidatorStub implements Validator {
    async validate (body: any): Promise<Error> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new OrderValidatorStub()
}

const makeEventRepository = (): IEventRepository => {
  class EventRepositoryStub implements IEventRepository {
    getById: (id: number) => Promise<event>
    update: (eventForUpdate: event, newEvent: CreateEventDto) => Promise<EventDto>
    delete: (id: number) => Promise<void>
    getAll: () => Promise<EventDto[]>
    async add (event: CreateEventDto): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }
  }

  return new EventRepositoryStub()
}

const makeEventService = (): AbstractEventService => {
  class EventServiceStub extends AbstractEventService {
    async create (body: any): Promise<EventDto> {
      return new Promise(resolve => resolve(mockEventDto))
    }
  }

  return new EventServiceStub(makeEventRepository())
}

const makeOrderService = (): AbstractOrderService => {
  class OrderServiceStub extends AbstractOrderService {
    async createOrder (requestOrderEvent: RequestOrderEventDto): Promise<void> {}
    async checkEvent (requestOrderEvent: RequestOrderEventDto): Promise<Error> {
      return null
    }
  }
  return new OrderServiceStub(makeEventService())
}

const makeSut = (): SutTypes => {
  const orderService = makeOrderService()
  const orderValidator = makeOrderValidator()
  const sut = new CreateOrderController(orderService, orderValidator)
  return { sut, orderService, orderValidator }
}

describe('create order controller', () => {
  test('shold return unprocessable entity if validate return error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderValidator } = makeSut()
    jest.spyOn(orderValidator, 'validate').mockImplementationOnce(errorValidateFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
  })

  test('shold return server error if validate throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderValidator } = makeSut()
    jest.spyOn(orderValidator, 'validate').mockImplementationOnce(throwErrorFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('validator shold be called with correct params', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderValidator } = makeSut()
    const spyOrderValidator = jest.spyOn(orderValidator, 'validate')
    await sut.handle(request)
    expect(spyOrderValidator).toHaveBeenCalledWith(request.body)
  })

  test('shold return server error if service checkEvent returns error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderService } = makeSut()
    jest.spyOn(orderService, 'checkEvent').mockImplementationOnce(errorValidateFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
  })

  test('shold return server error if service checkEvent throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderService } = makeSut()
    jest.spyOn(orderService, 'checkEvent').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return server error if service createOrder throw error', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut, orderService } = makeSut()
    jest.spyOn(orderService, 'createOrder').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return succes if all right', async () => {
    const request = {
      header: 'any_header',
      body: 'any_body'
    }
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(noContent())
  })
})
