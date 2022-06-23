import { IUserRepository } from './../protocols/i-user-repository'

import { sequelize } from '../../../data/sequelize'
import UserModel from '../../../domain/models/user'

export class UserRepository implements IUserRepository {
  private readonly userRepository = sequelize.getRepository(UserModel)

  async getByEmail (email: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { email }
    })
  }
}
