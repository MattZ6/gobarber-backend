import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(except_user_id: string): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id,
    });

    return users;
  }
}
