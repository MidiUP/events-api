import { makeUserService } from './../services/user-service-factory'
import { Middleware } from './../../../presentation/protocols/middleware'
import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (): Middleware => {
  const userService = makeUserService()
  return new AuthMiddleware(userService)
}
