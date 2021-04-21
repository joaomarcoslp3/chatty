import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User'

@Entity('messages')
class Message {

  @PrimaryColumn()
  id: string

  @Column()
  adminId: string

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User)
  user: User

  @Column()
  userId: string

  @Column()
  text: string

  @CreateDateColumn()
  createdAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Message }
