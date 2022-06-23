import { sequelize } from '../../../src/data/sequelize'
import EventModel from '../../../src/domain/models/event'

const eventRepository = sequelize.getRepository(EventModel)

export const createEventTests = async (): Promise<EventModel> => {
  return await eventRepository.create({
    name: 'test_integration_item',
    dateHour: '06/19/1999',
    availableTickets: 50,
    soldTickets: 50,
    idInstitution: 1
  })
}
