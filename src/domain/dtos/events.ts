import InstitutionModel from '../models/institution'

export interface CreateEventDto {
  name: string
  dateHour: Date
  availableTickets: number
  soldTickets: number
  idInstitution: number
}

export interface EventDto {
  id: number
  name: string
  dateHour: Date
  availableTickets: number
  soldTickets: number
  idInstitution?: number
  createdAt?: Date
  updatedAt?: Date
  institution?: InstitutionModel
}
