import { Router } from 'express';

import appointmentRoutes from '@modules/appointments/infra/http/routes/appointments.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/v1/appointments', appointmentRoutes);
routes.use('/v1/users', userRoutes);
routes.use('/v1/sessions', sessionRoutes);

export default routes;
