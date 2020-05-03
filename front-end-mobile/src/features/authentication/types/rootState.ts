export type RootState = {
  onAuthenticated?: (accessToken: string, refreshToken?: string) => void;
  accessToken?: string;
  refreshToken?: string;
  testMode: boolean;
}