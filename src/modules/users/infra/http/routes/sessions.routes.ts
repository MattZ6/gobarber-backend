import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const router = Router();
const sessionsController = new SessionsController();

router.post('/', sessionsController.store);

export default router;
