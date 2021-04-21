import { Request, Response } from 'express'
import { SettingsService, SettingsCreation } from '../services/SettignsService'

class SettingsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { chat, username } = req.body as SettingsCreation
    const settingsService = new SettingsService()

    try {
      const settings = await settingsService.create({ chat, username })
      return res.json(settings)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export { SettingsController }
