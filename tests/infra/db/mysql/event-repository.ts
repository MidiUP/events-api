// import { CreateEventDto, EventDto } from './../../../../src/domain/dtos/events'
// import { IEventRepository } from './../../../../src/infra/db/protocols/i-event-repository'
// import { Repository } from 'sequelize-typescript'
// import EventModel from '../../../../src/domain/models/event'
// import dateMock from '../../../helpers/date-mock'
// import { EventRepository } from '../../../../src/infra/db/mysql/event-repository'
// import { sequelize } from '../../../../src/data/sequelize'

// interface SutTypes {
//   sut: IEventRepository
//   eventRepository: Repository<EventModel>
// }

// const mockCreateEventDto: CreateEventDto = {
//   availableTickets: 0,
//   dateHour: dateMock,
//   name: 'any_name',
//   soldTickets: 0,
//   idInstitution: 0
// }

// const mockEvent: EventDto = {
//   id: 0,
//   availableTickets: 0,
//   dateHour: dateMock,
//   name: 'any_name',
//   soldTickets: 0
// }

// const makeSut = (): SutTypes => {
//   const eventRepository = sequelize.getRepository(EventModel)
//   const sut = new EventRepository()
//   return { sut, eventRepository }
// }

// describe('event repository add', () => {
//   // test('shold return unprocessable entity if validate return error', async () => {
//   //   const request = {
//   //     header: 'any_header',
//   //     body: 'any_body'
//   //   }
//   //   const { sut, eventValidator } = makeSut()
//   //   jest.spyOn(eventValidator, 'validate').mockImplementationOnce(errorValidateFunction)
//   //   const response = await sut.handle(request)
//   //   expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
//   // })

//   // test('shold return server error if validate throw error', async () => {
//   //   const request = {
//   //     header: 'any_header',
//   //     body: 'any_body'
//   //   }
//   //   const { sut, eventValidator } = makeSut()
//   //   jest.spyOn(eventValidator, 'validate').mockImplementationOnce(throwErrorFunction)
//   //   const response = await sut.handle(request)
//   //   expect(response).toEqual(serverError(new Error()))
//   // })

//   test('repositoryEvent.create shold be called with correct params', async () => {
//     const { sut, eventRepository } = makeSut()
//     const spyEventRepository = jest.spyOn(eventRepository, 'create').mockReturnValueOnce(new Promise(resolve => resolve(mockEvent)))
//     await sut.add(mockCreateEventDto)
//     expect(spyEventRepository).toHaveBeenCalledWith(mockCreateEventDto)
//   })

//   // test('shold return server error if service throw error', async () => {
//   //   const request = {
//   //     header: 'any_header',
//   //     body: 'any_body'
//   //   }
//   //   const { sut, eventService } = makeSut()
//   //   jest.spyOn(eventService, 'create').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
//   //   const response = await sut.handle(request)
//   //   expect(response).toEqual(serverError(new Error()))
//   // })

//   // test('shold return succes if all right', async () => {
//   //   const request = {
//   //     header: 'any_header',
//   //     body: 'any_body'
//   //   }
//   //   const { sut } = makeSut()
//   //   const response = await sut.handle(request)
//   //   expect(response).toEqual(success(mockEventDto))
//   // })
// })
