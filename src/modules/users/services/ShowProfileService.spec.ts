import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const name = 'John Doe';
    const email = 'johndoe@example.com';

    const { id } = await fakeUsersRepository.create({
      name,
      email,
      password: '123456',
    });

    const profile = await showProfile.execute(id);

    expect(profile.id).toBe(id);
    expect(profile.name).toBe(name);
    expect(profile.email).toBe(email);
  });

  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user-id')
    ).rejects.toBeInstanceOf(AppError);
  });
});
