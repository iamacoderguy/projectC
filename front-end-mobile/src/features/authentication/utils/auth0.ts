import Auth0 from 'react-native-auth0';
import R from 'res/R';
import { User } from 'lib/types/user';
import { saveCredentials } from 'lib/utils/dangerZone/storage';

const config = R.config.AUTH0;
const auth0 = new Auth0(config.credentials);
let _refreshToken: string | undefined;

export type SocialConnection = 'github' | 'google-oauth2';
export type PasswordRealm = {
  username: string;
  password: string;
}
export type Credentials = {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  scope: string;
  tokenType: 'Bearer';
  refreshToken?: string;
}

const scopes = {
  // used by an application during authentication to authorize access to a user's details, like name and picture
  // https://auth0.com/docs/scopes/current/oidc-scopes
  OIDC: 'openid profile email offline_access',
};

const setRefreshToken = async (newValue?: string) => {
  _refreshToken = newValue;
  await saveCredentials('refreshToken', _refreshToken || '');
};

export const renewToken = async () => {
  try {
    const credentials: Credentials = await auth0.auth
      .refreshToken({
        refreshToken: _refreshToken || '',
      });

    if (credentials.refreshToken) {
      await setRefreshToken(credentials.refreshToken);
    }

    return credentials;
  }
  catch (error) {
    await setRefreshToken(undefined);
    throw error;
  }
};

export const signUpOrSignInWithSocialConnection = async (socialConnection: SocialConnection) => {
  if (_refreshToken) {
    return await renewToken();
  }

  const credentials: Credentials = await auth0.webAuth
    .authorize({
      scope: scopes.OIDC,
      connection: socialConnection,
      audience: config.api.id,
    });

  await setRefreshToken(credentials.refreshToken);

  return credentials;
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

export const signInManual = async (user: PasswordRealm) => {
  const credentials = await auth0.auth
    .passwordRealm({
      username: user.username,
      password: user.password,
      realm: config.connections.database,
      scope: scopes.OIDC,
      audience: config.api.id,
    });

  await setRefreshToken(credentials.refreshToken);

  return credentials;
};