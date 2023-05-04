import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user_entity'

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  amount!: number

  @Column()
  debt!: boolean

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  user!: UserEntity
}
