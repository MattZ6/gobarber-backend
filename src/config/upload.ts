import { resolve } from 'path';
import crypto from 'crypto';
import { diskStorage, StorageEngine } from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: { storage: StorageEngine };

  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  uploadsFolder: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

  multer: {
    storage: diskStorage({
      destination: tmpFolder,
      filename(req, file, callback) {
        const hash = crypto.randomBytes(10).toString('HEX');

        const fileName = `${hash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: 'bucket-name',
    },
  },
} as IUploadConfig;
