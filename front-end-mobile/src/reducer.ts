import { Action } from 'lib/types/action';
import { getType } from 'typesafe-actions';
import { finishLoadingRequest, finishAuthenticationSuccess, changeLanguageSuccess } from './actions';

export type RootState = {
  auth?: any,
  inApp?: any,
  lng?: string,
}

const initialState: RootState = {};

function rootReducer (
  previousState: RootState = initialState,
  action: Action,
): RootState {
  switch (action.type) {
    case getType(finishLoadingRequest):
      return { ...previousState, auth: {}, inApp: undefined };
    
    case getType(finishAuthenticationSuccess):
      return { ...previousState, auth: undefined, inApp: {} };

    case getType(changeLanguageSuccess):
      return { ...previousState, lng: (action as ReturnType<typeof changeLanguageSuccess>).payload.lng };

    default:
      return previousState;
  }
}

export default rootReducer;