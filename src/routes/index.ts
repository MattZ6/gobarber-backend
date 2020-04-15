import { Router } from 'express';

import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';
import sessionRoutes from './sessions.routes';

const routes = Router();

routes.use('/v1/appointments', appointmentRoutes);
routes.use('/v1/users', userRoutes);
routes.use('/v1/sessions', sessionRoutes);

export default routes;
