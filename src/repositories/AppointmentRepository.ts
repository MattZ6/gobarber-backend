import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment> {
  async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = await this.findOne({
      where: { date },
    });

    return appointment || null;
  }
}
