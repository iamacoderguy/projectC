export type AuthProps = {
  onAuthenticated?: (accessToken: string, refreshToken?: string) => void;
  onSignedOut?: () => void;
  refreshToken?: string;
  testMode?: boolean;
}