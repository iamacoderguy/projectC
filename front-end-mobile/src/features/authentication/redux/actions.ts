import { createAction } from 'typesafe-actions';
import tag from '../constants/tag';
import { AuthProps } from '../types/authProps';
import { Credentials } from 'shared/types/credentials';

const makeType = (type: string) => {
  return `${tag}_${type}`;
};

export const initialize = createAction(makeType('INITIALIZE'))<AuthProps>();
export const renewToken = createAction(makeType('RENEW_TOKEN'))<string>();
export const authenticated = createAction(makeType('AUTHENTICATED'))<Credentials>();

export const signOutRequest = createAction(makeType('SIGN_OUT_REQUEST'))<string>();
export const signOutSuccess = createAction(makeType('SIGN_OUT_SUCCESS'))();