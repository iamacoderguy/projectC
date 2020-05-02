import express, { Request, Response } from 'express';
import jwtAuthz from 'express-jwt-authz';
import checkJwt from '../middlewares/checkJwt';

const router = express.Router();
const checkScopes = jwtAuthz(['read:helloWorld']);

router.get('/', nonAuthenticatedRequests);
router.get('/private', checkJwt, authenticatedRequests);
router.get('/private-scoped', checkJwt, checkScopes, authorizedRequests);

function nonAuthenticatedRequests(_req: Request, res: Response): void {
  res
    .json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
    });
}

function authenticatedRequests(_req: Request, res: Response): void {
  res
    .json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.',
    });
}

function authorizedRequests(_req: Request, res: Response): void {
  res
    .json({
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:helloWorld to see this.',
    });
}

export default router;
