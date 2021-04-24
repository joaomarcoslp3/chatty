import { getCustomRepository, Repository } from 'typeorm'
import { Connection } from '../entities/Connection'
import { ConnectionsRepository } from '../repositories/ConnectionRepository'

export type ConnectionCreation = {
  socketId: string
  userId: string
  adminId?: string
  id?: string
}

class ConnectionsService {
  private connectionRepository: Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionsRepository)
  }

  async create({ socketId, userId, adminId, id }: ConnectionCreation) {
    const connection = this.connectionRepository.create({
      socketId,
      userId,
      adminId,
      id
    })

    await this.connectionRepository.save(connection)
    
    return connection
  }

  async findByUserId (userId: string) {
    const connection = await this.connectionRepository.findOne({
      userId
    })
    return connection
  }
}

export { ConnectionsService }
