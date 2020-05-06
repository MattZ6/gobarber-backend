import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(x => x.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(x => x.email === email);

    return user;
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex(x => x.id === user.id);

    this.users[index] = user;

    return user;
  }
}
