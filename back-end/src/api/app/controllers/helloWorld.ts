import express, { Request, Response } from 'express';
import jwtAuthz from 'express-jwt-authz';
import jwtChecker from '../middlewares/jwtChecker';

type AuthenticatedRequest = express.Request & {
  user?: unknown;
}
const router = express.Router();
const checkScopes = jwtAuthz(['read:helloWorld'], { customScopeKey: 'permissions', failWithError: true });

router.get('/', nonAuthenticatedRequests);
router.get('/private', jwtChecker, authenticatedRequests);
router.get('/private-scoped', jwtChecker, checkScopes, authorizedRequests);

function nonAuthenticatedRequests(_req: Request, res: Response): void {
  res
    .json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
    });
}

function authenticatedRequests(req: AuthenticatedRequest, res: Response): void {
  res
    .json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.',
      user: req.user,
    });
}

function authorizedRequests(req: AuthenticatedRequest, res: Response): void {
  res
    .json({
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:helloWorld to see this.',
      user: req.user,
    });
}

export default router;
