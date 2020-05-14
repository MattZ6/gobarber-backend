import { promises } from 'fs';
import { resolve } from 'path';
import { S3 } from 'aws-sdk';
import * as mime from 'mime';

import uploadConfig from '@config/upload';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  async saveFile(filePath: string): Promise<string> {
    const originalPath = resolve(uploadConfig.tmpFolder, filePath);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filePath,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        // ContentDisposition: `inline; filename=${filePath}`,
      })
      .promise();

    await promises.unlink(originalPath);

    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: filePath,
      })
      .promise();
  }
}
