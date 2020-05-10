import express, { Request, Response } from 'express';
import config from '../../config';

const router = express.Router();

router.get('/', helloWorld);

function helloWorld(_req: Request, res: Response): void {
  res.send(`Hello World! from ${config.env}`);
}

export default router;
