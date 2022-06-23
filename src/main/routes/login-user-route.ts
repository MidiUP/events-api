import { makeLoginUserController } from './../factories/controllers/login-user-controller-factory'
import { Router } from 'express'
import { adapterRouter } from '../adapters/adapter-route'

export default (route: Router): void => {
  route.post('/login-user', adapterRouter(makeLoginUserController()))
}
