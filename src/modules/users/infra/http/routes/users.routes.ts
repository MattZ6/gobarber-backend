import { Router } from 'express';
import multer from 'multer';

import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const router = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

router.post('/', usersController.store);

router.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  userAvatarController.update
);

export default router;
