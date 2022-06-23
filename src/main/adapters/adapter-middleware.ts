import { Middleware } from './../../presentation/protocols/middleware'
import { HttpRequest } from '../../presentation/protocols/http'
import { Request, Response, NextFunction } from 'express'

export const adapterMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request: HttpRequest = {
      header: {
        params: req.params,
        query: req.query,
        acessToken: req.headers?.['x-acess-token']
      },
      body: req.body
    }

    const response = await middleware.handle(request)

    if (response.statusCode >= 200 && response.statusCode <= 299) {
      req.infoToken = response.body
      next()
    } else {
      return res.status(response.statusCode).json({
        error: response.body.message
      })
    }
  }
}
