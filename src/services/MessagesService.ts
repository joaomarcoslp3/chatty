import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repositories/MessagesRepository"

export type MessageCreation = {
  adminId?: string
  text: string
  userId: string
}

class MessagesService {
  async create({ adminId, text, userId }: MessageCreation) {
    const messageRespository = getCustomRepository(MessagesRepository)

    const message = messageRespository.create({
      adminId,
      text,
      userId
    })

    await messageRespository.save(message)

    return message
  }

  async listByUser(userId: string) {
    const messageRespository = getCustomRepository(MessagesRepository)

    const list = await messageRespository.find({
      where: { userId },
      relations: ['user']
    })

    return list
  }
}

export { MessagesService }
