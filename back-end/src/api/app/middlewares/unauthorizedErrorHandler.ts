import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { ErrorResult } from '../../httpResponses';

const unauthorizedErrorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line eqeqeq
  if (err.name != 'UnauthorizedError') {
    next(err);
    return;
  }

  res.status(401).send(ErrorResult({
    reason: err.message,
  }));
};

export default unauthorizedErrorHandler;
