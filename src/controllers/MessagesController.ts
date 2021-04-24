import { Request, Response } from 'express'
import { MessagesService, MessageCreation } from '../services/'

const messageService = new MessagesService()

class MessagesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { text, userId, adminId } = req.body as MessageCreation

    try {
      const message = await messageService.create({
        text,
        userId,
        adminId
      })
      return res.json(message)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  
  async showByUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const list = await messageService.listByUser(id)

    return res.json(list)
  }
}

export { MessagesController }
