import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { URL } from 'url';
import config from '../../../config';

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: (new URL('.well-known/jwks.json', config.auth0.domain)).href,
  }),

  // Validate the audience and the issuer.
  audience: config.auth0.buzzApiId,

  // The issuer url need to end by an '/'
  issuer: (new URL('/', config.auth0.domain)).href,
  algorithms: ['RS256'],
});

export default checkJwt;
