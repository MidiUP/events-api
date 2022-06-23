import { UnauthorizedError } from './../../../src/presentation/errors/unauthorized-error'
import { throwErrorFunction } from './../../helpers/throw-error-mock'
import { UnprocessableEntityError } from './../../../src/presentation/errors/unprocessable-entity-error'
import { unprocessableEntity, serverError, unauthorized, success } from './../../../src/presentation/helpers/http-helpers'
import { errorValidateFunction } from './../../helpers/error-validate-mock'
import { HttpRequest } from './../../../src/presentation/protocols/http'
import { ManagerToken } from './../../../src/infra/protocols/manager-token'
import { Encrypter } from './../../../src/infra/protocols/encrypter'
import { Validator } from './../../../src/presentation/protocols/validator'
import { LoginUserController } from '../../../src/presentation/controllers/login-user-controller'
import { AbstractUserService } from '../../../src/domain/usecases/abstract-user-service'
import { IUserRepository } from '../../../src/infra/db/protocols/i-user-repository'
import UserModel from '../../../src/domain/models/user'

interface sutTypes {
  sut: LoginUserController
  userValidation: Validator
  userService: AbstractUserService
}

const mockUser = {
  id: 0,
  name: 'any_name',
  email: 'any_email'
}

const mockToken = 'any_token'

const makeValidator = (): Validator => {
  class Validation implements Validator {
    async validate (input: any): Promise<Error> {
      return null
    }
  }
  return new Validation()
}

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

const makeUserService = (): AbstractUserService => {
  class UserServiceStub extends AbstractUserService {
    async getUserByEmail (email: string): Promise<UserModel> {
      return new Promise(resolve => resolve(mockUser as UserModel))
    }

    async authenticate (user: UserModel, password: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }

    async generateToken (user: UserModel): Promise<string> {
      return new Promise(resolve => resolve(mockToken))
    }
  }
  return new UserServiceStub(makeUserRepository(), makeEncrypter(), makeManagerToken())
}

const makeSut = (): sutTypes => {
  const userValidation = makeValidator()
  const userService = makeUserService()
  const sut = new LoginUserController(userValidation, userService)
  return {
    sut,
    userValidation,
    userService
  }
}

const request: HttpRequest = {
  header: {},
  body: {
    email: 'any_email',
    password: 'any_password'
  }
}

describe('login controller', () => {
  test('shold return unprocessable entity if validate return error', async () => {
    const { sut, userValidation } = makeSut()
    jest.spyOn(userValidation, 'validate').mockImplementationOnce(errorValidateFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('any_error')))
  })

  test('shold return server error if validate throw error', async () => {
    const { sut, userValidation } = makeSut()
    jest.spyOn(userValidation, 'validate').mockImplementationOnce(throwErrorFunction)
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('validator shold be called with correct params', async () => {
    const { sut, userValidation } = makeSut()
    const spyUserValidation = jest.spyOn(userValidation, 'validate')
    await sut.handle(request)
    expect(spyUserValidation).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password'
    })
  })

  test('getUserByEmail shold be called with correct params', async () => {
    const { sut, userService } = makeSut()
    const spyUserService = jest.spyOn(userService, 'getUserByEmail')
    await sut.handle(request)
    expect(spyUserService).toHaveBeenCalledWith('any_email')
  })

  test('shold return unprocessable entity if getUserByEmail returns null', async () => {
    const { sut, userService } = makeSut()
    jest.spyOn(userService, 'getUserByEmail').mockReturnValueOnce(null)
    const response = await sut.handle(request)
    expect(response).toEqual(unprocessableEntity(new UnprocessableEntityError('email is not registered')))
  })

  test('shold return server error if getUserByEmail throw error', async () => {
    const { sut, userService } = makeSut()
    jest.spyOn(userService, 'getUserByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('authenticate shold be called with correct params', async () => {
    const { sut, userService } = makeSut()
    const spyUserService = jest.spyOn(userService, 'authenticate')
    await sut.handle(request)
    expect(spyUserService).toHaveBeenCalledWith(mockUser, 'any_password')
  })

  test('shold return unauthorized if authenticate returns false', async () => {
    const { sut, userService } = makeSut()
    jest.spyOn(userService, 'authenticate').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const response = await sut.handle(request)
    expect(response).toEqual(unauthorized(new UnauthorizedError('invalid password')))
  })

  test('shold return server error if authenticate throw error', async () => {
    const { sut, userService } = makeSut()
    jest.spyOn(userService, 'authenticate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('generateToken shold be called with correct params', async () => {
    const { sut, userService } = makeSut()
    const spyUserService = jest.spyOn(userService, 'generateToken')
    await sut.handle(request)
    expect(spyUserService).toHaveBeenCalledWith(mockUser)
  })

  test('shold return server error if generateToken throw error', async () => {
    const { sut, userService } = makeSut()
    jest.spyOn(userService, 'generateToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle(request)
    expect(response).toEqual(serverError(new Error()))
  })

  test('shold return success if all right', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(request)
    expect(response).toEqual(success({ token: mockToken }))
  })
})
