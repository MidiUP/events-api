import { EventDto } from '../../../domain/dtos/events'
import EventModel from '../../../domain/models/event'

export const formatEventDto = (event: EventModel): EventDto => {
  const {
    id,
    name,
    dateHour,
    availableTickets,
    soldTickets,
    idInstitution,
    createdAt,
    updatedAt,
    institution
  } = event

  return {
    id,
    name,
    dateHour,
    availableTickets,
    soldTickets,
    idInstitution,
    createdAt,
    updatedAt,
    institution
  }
}
