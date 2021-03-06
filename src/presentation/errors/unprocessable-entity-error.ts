export class UnprocessableEntityError extends Error {
  constructor (private readonly error: string) {
    super(`Unprocessable Entity: ${error}`)
    this.name = 'Unprocessable Entity'
  }
}
