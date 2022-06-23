import { Express } from 'express'
import { createEventTests } from '../../helpers/integration-helpers/create-event-test'
import supertest from 'supertest'
import { setupApp } from '../../../src/main/config/app'
import { deleteEventTests } from '../../helpers/integration-helpers/delete-event-tests'

const app: Express = setupApp()
let server: any

describe('tests integration of get event', () => {
  beforeAll(async () => {
    server = app.listen(process.env.PORT, () => console.log(`Server running in test mode at http://localhost:${process.env.PORT}`))
    await createEventTests()
  })

  afterAll(async () => {
    await deleteEventTests()
    server.close()
  })

  test('shold return 200', async () => {
    await supertest(app)
      .get('/api/event')
      .send()
      .expect(200)
  })
})
