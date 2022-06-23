import { createEventTests } from '../../helpers/integration-helpers/create-event-test'
import supertest from 'supertest'
import { setupApp } from '../../../src/main/config/app'
import { deleteEventTests } from '../../helpers/integration-helpers/delete-event-tests'
import EventModel from '../../../src/domain/models/event'

const app = setupApp()
let server: any

describe('tests integration of delete event', () => {
  let eventTest: EventModel

  beforeAll(async () => {
    server = app.listen(process.env.PORT, () => console.log(`Server running in test mode at http://localhost:${process.env.PORT}`))
    eventTest = await createEventTests()
  })

  afterAll(async () => {
    await deleteEventTests()
    server.close()
  })

  test('shold return 422 if it not a number', async () => {
    await supertest(app)
      .delete('/api/event/notnumber')
      .send()
      .expect(422)
  })

  test('shold return 204 if dateHour is empty', async () => {
    await supertest(app)
      .delete(`/api/event/${eventTest.id}`)
      .send()
      .expect(204)
  })
})
