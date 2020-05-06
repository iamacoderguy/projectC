import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { ErrorResult } from '../../httpResponses';

const forbiddenErrorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line eqeqeq
  if (err.message != 'Insufficient scope') {
    next(err);
    return;
  }

  res.status(403).send(ErrorResult({
    reason: err.message,
  }));
};

export default forbiddenErrorHandler;
