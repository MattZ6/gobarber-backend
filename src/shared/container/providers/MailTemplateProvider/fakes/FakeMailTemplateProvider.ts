import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  async parse(): Promise<string> {
    return 'Mail template';
  }
}
