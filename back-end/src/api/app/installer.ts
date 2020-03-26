import express from 'express';
import aboutController from './controllers/about';

const app = express();

app.use('/api/about', aboutController);

export default app;
