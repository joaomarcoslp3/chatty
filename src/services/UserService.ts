import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

type IsUsersCreate = {
  email: string
}

class UserService {
  async create ({email}: IsUsersCreate) {
    const userRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await userRepository.findOne({ email })

    if (userAlreadyExists) {
      return userAlreadyExists  
    }

    const user = userRepository.create({email})

    await userRepository.save(user)

    return user
  }
}

export { UserService }
