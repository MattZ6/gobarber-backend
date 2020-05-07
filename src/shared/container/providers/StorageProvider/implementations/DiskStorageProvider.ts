import { promises } from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  async saveFile(filePath: string): Promise<string> {
    await promises.rename(
      resolve(uploadConfig.tmpFolder, filePath),
      resolve(uploadConfig.uploadsFolder, filePath)
    );

    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    const path = resolve(uploadConfig.uploadsFolder, filePath);

    try {
      await promises.stat(path);
    } catch {
      return;
    }

    await promises.unlink(path);
  }
}
