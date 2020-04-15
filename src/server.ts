import express from 'express';
import 'reflect-metadata';

import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/v1/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('💩 Listen in port 3333!');
});
