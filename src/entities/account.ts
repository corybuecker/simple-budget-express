import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user'

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ nullable: false })
  name!: string

  @Column({ nullable: false })
  amount!: number

  @Column({ default: false, nullable: false })
  debt!: boolean

  @ManyToOne(() => User, (user) => user.accounts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user!: User
}
