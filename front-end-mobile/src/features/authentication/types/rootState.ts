export type RootState = {
  onAuthenticated?: (accessToken: string, refreshToken?: string) => void;
  onSignedOut?: () => void;
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  testMode: boolean;
}