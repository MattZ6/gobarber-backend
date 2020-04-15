import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });

  delete user.password;

  return res.status(202).json(user);
});

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  async (req, res) => {
    const { id: user_id } = req.user;

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id,
      filename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }
);

export default router;
