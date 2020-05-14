import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import SesMailProvider from '@shared/container/providers/MailProvider/implementations/SesMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SesMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
