import { DataSource, Repository } from 'typeorm'
import { User } from '../entities/user'

class UserService {
  private readonly repository: Repository<User>
  private readonly email: string

  constructor(email: string | undefined, dataSource: DataSource) {
    if (email === undefined) {
      throw Error('must supply email address')
    }

    this.email = email
    this.repository = dataSource.getRepository(User)
  }

  public async getLoggedInUser() {
    return await this.repository.findOneOrFail({ where: { email: this.email } })
  }
}

export default UserService
