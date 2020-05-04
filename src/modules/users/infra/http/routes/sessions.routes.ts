import { Router } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSessionService = new CreateSessionService();

  const auth = await createSessionService.execute({ email, password });

  return res.status(202).json(auth);
});

export default router;
