import { createAction } from 'typesafe-actions';
import tag from '../constants/tag';
import { AuthProps } from '../types/authProps';

const makeType = (type: string) => {
  return `${tag}_${type}`;
};

export const initialize = createAction(makeType('INITIALIZE'))<AuthProps>();
export const renewToken = createAction(makeType('RENEW_TOKEN'))<string>();
export const authenticated = createAction(makeType('AUTHENTICATED'))<{
  accessToken: string;
  refreshToken?: string;
}>();

export const signOutRequest = createAction(makeType('SIGN_OUT_REQUEST'))<string>();
export const signOutSuccess = createAction(makeType('SIGN_OUT_SUCCESS'))();