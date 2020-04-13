import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const router = Router();

const appointmentsRepository = new AppointmentsRepository();

router.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

router.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return res.status(202).json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default router;
