import Auth0 from 'react-native-auth0';
import R from 'res/R';
import { User } from 'lib/types/user';

const config = R.config.AUTH0;
const auth0 = new Auth0(config.credentials);

export type SocialConnection = 'github' | 'google-oauth2';
export type PasswordRealm = {
  username: string;
  password: string;
}
export type Credential = {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  scope: string;
  tokenType: string;
}

const scopes = {
  // used by an application during authentication to authorize access to a user's details, like name and picture
  // https://auth0.com/docs/scopes/current/oidc-scopes
  OIDC: 'openid profile email',
};

export const signUpOrSignInWithSocialConnection = (socialConnection: SocialConnection) => {
  return auth0.webAuth
    .authorize({
      scope: scopes.OIDC,
      connection: socialConnection,
      audience: config.api.id,
    });
};

export const signUpManual = (user: User) => {
  return auth0.auth
    .createUser({
      username: user.username,
      email: user.email,
      password: user.password,
      connection: config.connections.database,
      metadata: { displayName: user.displayName },
    });
};

export const signInManual = (user: PasswordRealm) => {
  return auth0.auth
    .passwordRealm({
      username: user.username,
      password: user.password,
      realm: config.connections.database,
      scope: scopes.OIDC,
      audience: config.api.id,
    });
};