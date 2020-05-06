import { AuthProps } from './authProps';

export type RootState = AuthProps & {
  accessToken?: string;
}