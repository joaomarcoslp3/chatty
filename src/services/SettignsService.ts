import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

type IsSettingsCreate =  {
  chat: boolean
  username: string
}

class SettingsService {
  async create({ chat, username }: IsSettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const userAlreadyExists = await settingsRepository.findOne({ username })

    if (userAlreadyExists) {
      throw new Error('User already exists!')  
    }
    
    const settings = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(settings)

    return settings
  }
}

export { SettingsService }
