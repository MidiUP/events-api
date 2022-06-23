import { IUserRepository } from './../../../src/infra/db/protocols/i-user-repository'
import { ManagerToken } from './../../../src/infra/protocols/manager-token'
import { Encrypter } from './../../../src/infra/protocols/encrypter'
import { AbstractUserService } from '../../../src/domain/usecases/abstract-user-service'
import UserModel from '../../../src/domain/models/user'

interface SutTypes {
  sut: AbstractUserService
  encrypter: Encrypter
  managerToken: ManagerToken
  userRepository: IUserRepository
}

const mockUser = {
  id: 0,
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
}

const mockToken = 'token'

const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async getByEmail (email: string): Promise<UserModel> {
      return new Promise(resolve => resolve(mockUser as UserModel))
    }
  }
  return new UserRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class Encrypt implements Encrypter {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }

    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hash'))
    }
  }
  return new Encrypt()
}

const makeManagerToken = (): ManagerToken => {
  class ManagerTokenStub implements ManagerToken {
    async generateToken (data: Object): Promise<string> {
      return new Promise(resolve => resolve('token'))
    }

    async validateToken (token: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new ManagerTokenStub()
}

const makeSut = (): SutTypes => {
  class UserService extends AbstractUserService {}
  const userRepository = makeUserRepository()
  const encrypter = makeEncrypter()
  const managerToken = makeManagerToken()
  const sut = new UserService(userRepository, encrypter, managerToken)

  return { sut, encrypter, managerToken, userRepository }
}

describe('AbstractUserService getUserByEmail', () => {
  test('userRepository.getByEmail add shold be called with correct params', async () => {
    const { sut, userRepository } = makeSut()
    const spyUserRepository = jest.spyOn(userRepository, 'getByEmail')
    await sut.getUserByEmail('any_email')
    expect(spyUserRepository).toHaveBeenCalledWith('any_email')
  })

  test('shold return userModel if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.getUserByEmail('any_email')
    expect(response).toEqual(mockUser)
  })
})

describe('AbstractUserService authenticate', () => {
  test('encrypter.compare shold be called with correct params', async () => {
    const { sut, encrypter } = makeSut()
    const spyEncrypter = jest.spyOn(encrypter, 'compare')
    await sut.authenticate(mockUser as UserModel, 'any_password')
    expect(spyEncrypter).toHaveBeenCalledWith('any_password', mockUser.password)
  })

  test('shold return true if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.authenticate(mockUser as UserModel, 'any_password')
    expect(response).toEqual(true)
  })
})

describe('AbstractUserService generateToken', () => {
  test('managerToken.generateToken shold be called with correct params', async () => {
    const { sut, managerToken } = makeSut()
    const spyManagerToken = jest.spyOn(managerToken, 'generateToken')
    await sut.generateToken(mockUser as UserModel)
    expect(spyManagerToken).toHaveBeenCalledWith({ id: mockUser.id })
  })

  test('shold return true if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.generateToken(mockUser as UserModel)
    expect(response).toEqual(mockToken)
  })
})
