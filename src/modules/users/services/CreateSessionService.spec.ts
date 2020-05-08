import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import CreateSessionService from '@modules/users/services/CreateSessionService';

describe('CreateSession', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const email = 'johndoe@example.com';
    const password = '123456';

    const user = await createUser.execute({
      name: 'John Doe',
      email,
      password,
    });

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const response = await createSession.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const email = 'johndoe@example.com';

    await createUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    const createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await expect(
      createSession.execute({
        email,
        password: 'wrongpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
