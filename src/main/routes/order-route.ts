import { makeCreateOrderController } from './../factories/controllers/create-order-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'

export default (route: Router): void => {
  route.post('/order', adapterRouter(makeCreateOrderController()))
}
