import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const router = Router();
const profileController = new ProfileController();

router.use(ensureAuthenticated);

router.get('/', profileController.show);
router.put('/', profileController.create);

export default router;
