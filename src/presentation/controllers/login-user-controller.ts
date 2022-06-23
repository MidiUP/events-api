import { UnprocessableEntityError } from '../errors/unprocessable-entity-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { serverError, success, unauthorized, unprocessableEntity } from '../helpers/http-helpers'
import { Validator } from '../protocols/validator'
import { Controller } from '../protocols/controller'
import { AbstractUserService } from '../../domain/usecases/abstract-user-service'
import { UnauthorizedError } from '../errors/unauthorized-error'

export class LoginUserController implements Controller {
  constructor (
    private readonly loginValidator: Validator,
    private readonly userService: AbstractUserService
  ) { }

  async handle (req: HttpRequest): Promise<HttpResponse> {
    try {
      const errorValidator = await this.loginValidator.validate(req.body)
      if (errorValidator) {
        return unprocessableEntity(errorValidator)
      }

      const { email, password } = req.body

      const user = await this.userService.getUserByEmail(email)
      if (!user) {
        return unprocessableEntity(new UnprocessableEntityError('email is not registered'))
      }

      const isPasswordValid = await this.userService.authenticate(user, password)
      if (!isPasswordValid) {
        return unauthorized(new UnauthorizedError('invalid password'))
      }

      const token = await this.userService.generateToken(user)

      return success({ token })
    } catch (error) {
      return serverError(error)
    }
  }
}
