import { Router } from 'express';
import appointmentRoutes from './appointments.routes';

const routes = Router();

routes.use('/v1/appointments', appointmentRoutes);

export default routes;
