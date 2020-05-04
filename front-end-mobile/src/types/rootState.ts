export type RootState = {
  auth?: {
    refreshToken?: string;
  },
  inApp?: any,
  lng?: string,
  isLocalizationInstalled?: boolean;
}