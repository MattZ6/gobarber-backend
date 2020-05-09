import { compile } from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = compile(template);

    return parseTemplate(variables);
  }
}
