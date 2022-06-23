import { UnauthorizedError } from './../errors/unauthorized-error'
import { serverError, success, unauthorized } from './../helpers/http-helpers'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from './../protocols/middleware'
import { AbstractUserService } from '../../domain/usecases/abstract-user-service'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly userService: AbstractUserService
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { acessToken } = request.header
      if (!acessToken) {
        return unauthorized(new UnauthorizedError('no token provided'))
      }

      const contentToken = await this.userService.checkToken(acessToken)

      if (!contentToken) {
        return unauthorized(new UnauthorizedError('token provided is invalid'))
      }

      return success(contentToken)
    } catch (err) {
      return serverError(err)
    }
  }
}
