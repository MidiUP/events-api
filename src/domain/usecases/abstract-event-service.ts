import { EventDto } from './../dtos/events'
import { IEventRepository } from '../../infra/db/protocols/i-event-repository'
import { CreateEventDto } from '../dtos/events'
import EventModel from '../models/event'

export abstract class AbstractEventService {
  constructor (
    private readonly eventRepository: IEventRepository
  ) {}

  async create (event: CreateEventDto): Promise<EventDto> {
    return await this.eventRepository.add(event)
  }

  async getAll (): Promise<EventDto[]> {
    return await this.eventRepository.getAll()
  }

  async getById (id: number): Promise<EventModel> {
    return await this.eventRepository.getById(id)
  }

  async update (eventForUpdate: EventModel, event: CreateEventDto): Promise<EventDto> {
    return await this.eventRepository.update(eventForUpdate, event)
  }

  async delete (id: number): Promise<void> {
    await this.eventRepository.delete(id)
  }

  async sellerTicketEvent (idEvent: number, selledTickets: number): Promise<void> {
    const event = await this.eventRepository.getById(idEvent)
    const eventSelled = { ...event, soldTickets: event.soldTickets + selledTickets }
    await this.eventRepository.update(event, eventSelled)
  }
}
