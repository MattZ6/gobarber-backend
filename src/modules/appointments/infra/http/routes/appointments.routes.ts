import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const router = Router();
const appointmentsController = new AppointmentsController();

router.use(ensureAuthenticated);

router.post('/', appointmentsController.store);

export default router;
