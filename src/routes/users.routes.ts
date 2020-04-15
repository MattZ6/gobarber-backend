import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return res.status(202).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
