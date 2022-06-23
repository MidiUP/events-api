import { sequelize } from '../../../src/data/sequelize'
import EventModel from '../../../src/domain/models/event'

const eventRepository = sequelize.getRepository(EventModel)

export const deleteEventTests = async (): Promise<void> => {
  await eventRepository.destroy({
    where: { name: 'test_integration_item' }
  })
}
