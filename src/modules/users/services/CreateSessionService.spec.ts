import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionService from '@modules/users/services/CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com';
    const password = '123456';

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password,
    });

    const response = await createSession.execute({
      email,
      password,
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.com';

    await fakeUsersRepository.create({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(
      createSession.execute({
        email,
        password: 'wrongpassword',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
