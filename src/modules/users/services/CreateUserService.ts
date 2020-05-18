import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const exists = !!(await this.usersRepository.findByEmail(email));

    if (exists) {
      throw new AppError('Email adress is already used', 409);
    }

    const passwordHash = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}
