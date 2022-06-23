import { ManagerToken } from './../protocols/manager-token'
import * as jwt from 'jsonwebtoken'

export class Jwt implements ManagerToken {
  constructor (
    private readonly key: string
  ) {}

  async generateToken (data: Object): Promise<string> {
    return new Promise(resolve => resolve(jwt.sign(data, this.key, { expiresIn: '1h' })))
  }

  async validateToken (token: string): Promise<any> {
    try {
      return jwt.verify(token, this.key)
    } catch (err) {
      return false
    }
  }
}
