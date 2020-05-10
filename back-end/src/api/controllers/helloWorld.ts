import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', helloWorld);

function helloWorld(_req: Request, res: Response): void {
  res.send('Hello World!');
}

export default router;
