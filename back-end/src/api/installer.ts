import express from 'express';
import morgan from 'morgan';
import helloWorldController from './controllers/helloWorld';

const app = express();
const logger = morgan('common');

app.use(logger);
app.use('/api/helloWorld', helloWorldController);

export default app;
