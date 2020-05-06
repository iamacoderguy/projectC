export type AuthState = {
  refreshToken?: string;
  idToken?: string;
}
export type RootState = {
  auth?: AuthState,
  inApp?: any,
  lng?: string,
  isLocalizationInstalled?: boolean;
}