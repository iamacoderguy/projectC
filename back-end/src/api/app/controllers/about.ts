import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', about);

function about(_req: Request, res: Response): void {
  res.send('hello!');
}

export default router;
