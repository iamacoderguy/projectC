import { createAction } from 'typesafe-actions';

const makeType = (type: string) => {
  return 'AUTHENTICATION_' + type;
};

export const signInRequest = createAction(makeType('SIGN_IN_REQUEST'))<{ username: string, password: string }>();
export const signInSuccess = createAction(makeType('SIGN_IN_SUCCESS'))<{ token: string }>();