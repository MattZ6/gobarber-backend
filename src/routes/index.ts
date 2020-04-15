import { Router } from 'express';
import appointmentRoutes from './appointments.routes';
import userRoutes from './users.routes';

const routes = Router();

routes.use('/v1/appointments', appointmentRoutes);
routes.use('/v1/users', userRoutes);

export default routes;
