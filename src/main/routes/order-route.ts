import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory'
import { adapterMiddleware } from './../adapters/adapter-middleware'
import { makeCreateOrderController } from './../factories/controllers/create-order-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'

export default (route: Router): void => {
  route.post('/order', adapterMiddleware(makeAuthMiddleware()), adapterRouter(makeCreateOrderController()))
}
