import { join } from 'path';
import { promises } from 'fs';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  filename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

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

    usersRepository.save(user);

    return user;
  }
}
