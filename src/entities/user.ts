import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from './account'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  email!: string

  @OneToMany(() => Account, (account) => account.user, { eager: true })
  accounts!: Account[]
}
