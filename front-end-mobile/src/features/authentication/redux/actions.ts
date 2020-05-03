import { createAction } from 'typesafe-actions';
import tag from '../constants/tag';

const makeType = (type: string) => {
  return `${tag}_${type}`;
};

export const signInRequest = createAction(makeType('SIGN_IN_REQUEST'))<{ username: string, password: string }>();
export const signInSuccess = createAction(makeType('SIGN_IN_SUCCESS'))<{ token: string }>();

export const authenticated = createAction(makeType('AUTHENTICATED'))<{
  accessToken: string;
  refreshToken?: string;
}>();

export const setMode = createAction(makeType('SET_MODE'))<boolean>();
export const setRefreshToken = createAction(makeType('SET_REFRESH_TOKEN'))<string | undefined>();