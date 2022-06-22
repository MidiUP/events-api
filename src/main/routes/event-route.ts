import { makeReadEventController } from './../factories/controllers/read-event-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'
import { makeCreateEventController } from '../factories/controllers/create-event-controller-factory'
import { makeUpdateEventController } from '../factories/controllers/update-event-controller-factory'
import { makeDeleteEventController } from '../factories/controllers/delete-event-controller-factory'

export default (route: Router): void => {
  route.post('/event', adapterRouter(makeCreateEventController()))
  route.get('/event', adapterRouter(makeReadEventController()))
  route.put('/event/:id', adapterRouter(makeUpdateEventController()))
  route.delete('/event/:id', adapterRouter(makeDeleteEventController()))
}
