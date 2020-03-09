import { createAction } from 'typesafe-actions';

const makeType = (type: string) => {
  return 'APP_' + type;
};

export const finishLoadingRequest = createAction(makeType('FINISH_LOADING_REQUEST'))();

export const finishAuthenticationRequest = createAction(makeType('FINISH_AUTHENTICATING_REQUEST'))<{ token: string }>();
export const finishAuthenticationSuccess = createAction(makeType('FINISH_AUTHENTICATING_SUCCESS'))();