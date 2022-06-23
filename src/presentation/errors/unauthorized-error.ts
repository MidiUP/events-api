export class UnauthorizedError extends Error {
  constructor (private readonly error: string) {
    super(`Unauthorized: ${error}`)
    this.name = 'Unauthorized'
  }
}
