import { LoginUserController } from '../../../presentation/controllers/login-user-controller'
import { LoginUserValidator } from '../../../validation/login-user-validator'
import { makeUserService } from '../services/user-service-factory'

export const makeLoginUserController = (): LoginUserController => {
  const loginUserValidator = new LoginUserValidator()
  const service = makeUserService()
  return new LoginUserController(loginUserValidator, service)
}
