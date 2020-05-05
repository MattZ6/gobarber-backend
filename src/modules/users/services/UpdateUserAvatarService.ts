import { join } from 'path';
import { promises } from 'fs';

import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const filepath = join(uploadConfig.directory, user.avatar);

      const stats = await promises.stat(filepath);

      if (stats) {
        await promises.unlink(filepath);
      }
    }

    user.avatar = filename;

    await this.usersRepository.update(user);

    return user;
  }
}
