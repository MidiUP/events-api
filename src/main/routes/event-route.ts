import { makeReadEventController } from './../factories/controllers/read-event-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'
import { makeCreateEventController } from '../factories/controllers/create-event-controller-factory'

export default (route: Router): void => {
  route.post('/event', adapterRouter(makeCreateEventController()))
  route.get('/event', adapterRouter(makeReadEventController()))
}
