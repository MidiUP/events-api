import { HttpResponse } from './../protocols/http'

export const success = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: error
  }
}

export const unprocessableEntity = (error: Error): HttpResponse => {
  return {
    statusCode: 422,
    body: error
  }
}
