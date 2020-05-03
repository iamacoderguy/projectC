export type AuthProps = {
  onAuthenticated?: (accessToken: string, refreshToken?: string) => void;
  refreshToken?: string;
  testMode?: boolean;
}