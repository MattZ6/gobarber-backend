import { promises } from 'fs';
import { compile } from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileContent);

    return parseTemplate(variables);
  }
}
