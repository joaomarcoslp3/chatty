import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

class UsersController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body
    const usersService = new UserService()

    try {
      const users = await usersService.create({ email })
      return res.json(users)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export { UsersController }
