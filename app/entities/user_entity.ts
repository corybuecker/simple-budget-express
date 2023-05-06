import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AccountEntity } from './account_entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  email!: string

  @OneToMany(() => AccountEntity, (account) => account.user, { eager: true })
  accounts!: AccountEntity[]
}
