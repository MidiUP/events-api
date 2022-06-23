import UserModel from '../../../domain/models/user'

export interface IUserRepository {
  getByEmail: (email: string) => Promise<UserModel>
}
