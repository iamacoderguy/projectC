import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { UnauthorizedResult } from '../../httpResponses';

const jwtErrorWrapper: ErrorRequestHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line eqeqeq
  if (err.name != 'UnauthorizedError') {
    next(err);
    return;
  }

  res.status(401).send(UnauthorizedResult({
    reason: err.message,
  }));
};

export default jwtErrorWrapper;
