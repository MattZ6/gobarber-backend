import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepostory = getRepository(User);

    const exists = (await userRepostory.count({ where: { email } })) === 1;

    if (exists) {
      throw Error('Email adress is already used');
    }

    const passwordHash = await hash(password, 8);

    const user = userRepostory.create({ name, email, password: passwordHash });

    await userRepostory.save(user);

    return user;
  }
}
