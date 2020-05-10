import express from 'express';
import helloWorldController from './controllers/helloWorld';

const app = express();

app.use('/api/helloWorld', helloWorldController);

export default app;
