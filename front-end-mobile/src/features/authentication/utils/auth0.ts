import Auth0 from 'react-native-auth0';
import R from 'res/R';
import { User } from 'lib/types/user';
import { Credential } from '../types/credential';

const config = R.config.AUTH0;
const auth0 = new Auth0(config.credentials);

export type SocialConnection = 'github' | 'google-oauth2';

export const signUpOrSignInWithSocialConnection = (socialConnection: SocialConnection) => {
  return auth0.webAuth
    .authorize({
      scope: 'openid profile email',
      connection: socialConnection,
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

export const signInManual = (user: Credential) => {
  return auth0.auth
    .passwordRealm({
      username: user.username,
      password: user.password,
      realm: config.connections.database,
      scope: 'openid profile email',
    });
};