import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

export default class AppointmentsRepository
  implements INotificationsRepository {
  private notifications: Notification[] = [];

  async create({
    user_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const appointment = new Notification();

    Object.assign(appointment, {
      id: new ObjectID(),
      content,
      user_id,
    } as Notification);

    this.notifications.push(appointment);

    return appointment;
  }
}
