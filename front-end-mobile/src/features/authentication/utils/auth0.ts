import Auth0, {
  UserInfo as Auth0UserInfo,
} from 'react-native-auth0';
import R from 'shared/res/R';
import { User } from 'shared/types/user';
import { contain } from 'shared/utils/string';
import jwt_decode from 'jwt-decode';
import MODULE_TAG from '../constants/tag';
import toast from 'shared/utils/toast';

const TAG = `${MODULE_TAG} - AUTH0`;
const config = R.config.AUTH0;
const auth0 = new Auth0(config.credentials);

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
export type UserInfo = Auth0UserInfo<{
  'https://buzz.iamacoderguy.me/displayName': string;
}>;

const scopes = {
  // used by an application during authentication to authorize access to a user's details, like name and picture
  // https://auth0.com/docs/scopes/current/oidc-scopes
  OIDC: 'openid profile email offline_access',
};

const renewToken = async (refreshToken?: string) => {
  try {
    const credentials: Credentials = await auth0.auth
      .refreshToken({
        refreshToken: refreshToken || '',
      });

    return credentials;
  }
  catch (error) {
    throw error;
  }
};

const signUpOrSignInWithSocialConnection = async (socialConnection: SocialConnection) => {
  const credentials: Credentials = await auth0.webAuth
    .authorize({
      scope: scopes.OIDC,
      connection: socialConnection,
      audience: config.api.id,
    });

  return credentials;
};

const signUpManual = (user: User) => {
  return auth0.auth
    .createUser({
      username: user.username,
      email: user.email,
      password: user.password,
      connection: config.connections.database,
      metadata: { displayName: user.displayName },
    });
};

const signInManual = async (user: PasswordRealm) => {
  const credentials = await auth0.auth
    .passwordRealm({
      username: user.username,
      password: user.password,
      realm: config.connections.database,
      scope: scopes.OIDC,
      audience: config.api.id,
    });

  return credentials;
};

const forgotPasswordManual = (email: string) => {
  return auth0.auth.resetPassword({
    email,
    connection: config.connections.database,
  });
};

const getProfile = (accessToken: string) => {
  return auth0.auth
    .userInfo<UserInfo>({
      token: accessToken,
    });
};

const getProfileFromToken = (idToken: string) => {
  const decodedToken: UserInfo = jwt_decode(idToken);
  return decodedToken;
};

const signOut = async (refreshToken?: string, sub?: string) => {
  if (sub && contain(sub, 'github', 'google-oauth2')) {
    await auth0.webAuth.clearSession(); 
  }

  if (refreshToken) {
    try {
      await auth0.auth.revoke({ refreshToken }); 
    } catch (error) {
      toast.warn(`${TAG} - ${error}`);
    }
  }
};

export default {
  renewToken,
  signUpOrSignInWithSocialConnection,
  signUpManual,
  signInManual,
  forgotPasswordManual,
  getProfile,
  getProfileFromToken,
  signOut,
};