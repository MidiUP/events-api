import { createEventTests } from './../../helpers/integration-helpers/create-event-test'
import supertest from 'supertest'
import { setupApp } from '../../../src/main/config/app'
import { deleteEventTests } from '../../helpers/integration-helpers/delete-event-tests'
import EventModel from '../../../src/domain/models/event'

const app = setupApp()
let server: any

describe('tests integration of update event', () => {
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
    const request = {
      dateHour: '06/19/1999',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put('/api/event/notnumber')
      .send(request)
      .expect(422)
  })

  test('shold return 422 if name is empty', async () => {
    const request = {
      dateHour: '06/19/1999',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if dateHour is empty', async () => {
    const request = {
      name: 'any_name',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if dateHour is not date', async () => {
    const request = {
      name: 'any_name',
      dateHour: 'invalid_date',
      availableTickets: 1,
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if availableTickets is not passed', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if availableTickets is not number', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 'not_number',
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if availableTickets is not greater than 0', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: -1,
      soldTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if soldTickets is not passed', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if soldTickets is not number', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: 'not_number',
      availableTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if soldTickets is not greater than 0', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      soldTickets: -1,
      availableTickets: 1,
      idInstitution: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if idInstitution is not passed', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      availableTickets: 1,
      soldTickets: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if idInstitution is not number', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      idInstitution: 'not_number',
      availableTickets: 1,
      soldTickets: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 422 if idInstitution is not greater than 0', async () => {
    const request = {
      name: 'any_name',
      dateHour: '06/19/1999',
      idInstitution: -1,
      availableTickets: 1,
      soldTickets: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(422)
  })

  test('shold return 200 if all right', async () => {
    const request = {
      name: 'test_integration_item',
      dateHour: '06/19/1999',
      idInstitution: 1,
      availableTickets: 1,
      soldTickets: 1
    }
    await supertest(app)
      .put(`/api/event/${eventTest.id}`)
      .send(request)
      .expect(200)
  })
})
