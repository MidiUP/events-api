import { Bcrypt } from './../../../infra/bcrypt/bcrypt'
import { UserRepository } from './../../../infra/db/mysql/user-repository'
import { UserService } from './../../../domain/services/user-service'
import { AbstractUserService } from '../../../domain/usecases/abstract-user-service'
import { Jwt } from '../../../infra/jwt/jwt'
import 'dotenv/config'

export const makeUserService = (): AbstractUserService => {
  const userRepository = new UserRepository()
  const encrypter = new Bcrypt(12)
  const managerToken = new Jwt(process.env.KEY_JWT)
  return new UserService(userRepository, encrypter, managerToken)
}
