import { ManagerToken } from '../../infra/protocols/manager-token'
import { IUserRepository } from './../../infra/db/protocols/i-user-repository'
import UserModel from '../models/user'
import { Encrypter } from '../../infra/protocols/encrypter'

export abstract class AbstractUserService {
  constructor (
    private readonly userRepository: IUserRepository,
    private readonly encrypter: Encrypter,
    private readonly managerToken: ManagerToken
  ) {}

  async getUserByEmail (email: string): Promise<UserModel> {
    return this.userRepository.getByEmail(email)
  }

  async authenticate (user: UserModel, password: string): Promise<boolean> {
    return await this.encrypter.compare(password, user.password)
  }

  async generateToken (user: UserModel): Promise<string> {
    return this.managerToken.generateToken({ id: user.id })
  }
}
