import { Credentials } from 'shared/types/credentials';

export type AuthProps = {
  onAuthenticated?: (credentials: Credentials) => void;
  onSignedOut?: () => void;
  refreshToken?: string;
  idToken?: string;
  testMode?: boolean;
}