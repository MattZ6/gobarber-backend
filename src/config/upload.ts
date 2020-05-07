import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: resolve(__dirname, '..', '..', 'tmp', 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(req, file, callback) {
      const hash = crypto.randomBytes(10).toString('HEX');

      const fileName = `${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
