import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(except_user_id: string): Promise<User[]> {
    const CACHE_KEY = `providers-list:${except_user_id}`;

    let users = await this.cacheProvider.recover<User[]>(CACHE_KEY);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id,
      });

      await this.cacheProvider.save(CACHE_KEY, classToClass(users));
    }

    return users;
  }
}
