import InstitutionModel from '../models/institution'

export interface CreateEventDto {
  name: string
  date_hour: Date
  available_tickets: number
  sold_tickets: number
  id_institution: number
}

export interface eventDto {
  id: number
  name: string
  date_hour: Date
  available_tickets: number
  sold_tickets: number
  id_institution?: number
  createdAt?: Date
  updatedAt?: Date
  institution?: InstitutionModel
}
