import express, { Request, Response } from 'express'

let router = express.Router();

router.get('/', about);

function about(req: Request, res: Response) {
    res.send('hello!');
}

export default router;
