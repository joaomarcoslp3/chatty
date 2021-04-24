import { io } from '../http'
import { UsersService, ConnectionsService, MessagesService } from '../services/'

type Params = {
  text: string
  email: string
}

io.on('connect', (socket) => {
  const connectionsService = new ConnectionsService()
  const usersService = new UsersService()
  const messagesService = new MessagesService()
  
  socket.on('client_first_access', async (params: Params) => {
    const socketId = socket.id
    const { text, email } = params
    let userId = null

    const userExists = await usersService.findByEmail(email)

    if (!userExists) {
      const user = await usersService.create(email)

      connectionsService.create({ socketId, userId: user.id })
      userId = user.id
    } else {
      userId = userExists.id
      const connection = await connectionsService.findByUserId(userExists.id)

      if (!connection) {
        connectionsService.create({ socketId, userId: userExists.id })
      } else {
        connection.socketId = socketId

        await connectionsService.create(connection)
      }
    }

    await messagesService.create({
      text,
      userId
    })
    const allMessages = await messagesService.listByUser(userId)
    socket.emit('client_list_all_messages', allMessages)

    const allUsers = await connectionsService.findAlWithoutAdmin()
    io.emit('admin_list_all_users', allUsers)
  })

  socket.on('client_send_to_admin', async (params) => {
    const { text, socketAdminId } = params
    const socketId = socket.id

    const { userId } = await connectionsService.findBySocketId(socketId)

    const message = await messagesService.create({
      text,
      userId
    })

    io.to(socketAdminId).emit('admin_receive_message', {
      message,
      socketId
    })
  })
})
