import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'
import { makeCreateEventController } from '../factories/controllers/create-event-controller-factory'

export default (route: Router): void => {
  route.post('/event', adapterRouter(makeCreateEventController()))
}
