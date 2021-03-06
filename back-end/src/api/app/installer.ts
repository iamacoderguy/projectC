import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { installer as dataInstaller } from '../../data/installer';

import helloWorldController from './controllers/helloWorld';
import { container } from 'tsyringe';
import { DbContext } from '../../data/dbContext';
import unauthorizedErrorHandler from './middlewares/unauthorizedErrorHandler';
import forbiddenErrorHandler from './middlewares/forbiddenErrorHandler';

console.info('Installing dependencies...');
dataInstaller.install(container);

const app = express();
const logger = morgan('common');

app.use(logger);
app.use('/api/helloWorld', helloWorldController);
app.use(unauthorizedErrorHandler);
app.use(forbiddenErrorHandler);

export async function connectToDb(): Promise<void> {
  console.info('Connecting to Mongo Atlas...');
  const context = container.resolve(DbContext);
  return context.connect({
    onConnected: () => {
      console.info('Mongo connected');
    },
    onError: (err) => {
      console.error('Error connecting to MongoDB', err);
      process.exit(1);
    },
  }).then((dbContext: DbContext) => {
    console.info(`Database name: ${dbContext.getDBName()}`);
  });
}

export default app;
