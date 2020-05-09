import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(x => x.id === id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(x => x.email === email);

    return user;
  }

  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    const users = this.users.filter(x => x.id !== except_user_id);

    return users;
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
