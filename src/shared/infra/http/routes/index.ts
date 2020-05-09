import { Router } from 'express';

import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/v1/appointments', appointmentRouter);
routes.use('/v1/providers', providersRouter);
routes.use('/v1/users', userRouter);
routes.use('/v1/sessions', sessionRouter);
routes.use('/v1/password', passwordRouter);
routes.use('/v1/profile', profileRouter);

export default routes;
