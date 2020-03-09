import { Action } from 'lib/types/action';
import { getType } from 'typesafe-actions';
import { finishLoadingRequest, finishAuthenticationSuccess } from './actions';

export type RootState = {
  auth?: any,
  inApp?: any,
}

const initialState: RootState = {};

const rootReducer = (previousState: RootState = initialState, action: Action) => {
  switch (action.type) {
    case getType(finishLoadingRequest):
      return { ...previousState, auth: {}, inApp: undefined };
    
    case getType(finishAuthenticationSuccess):
      return { ...previousState, auth: undefined, inApp: {} };

    default:
      return previousState;
  }
};

export default rootReducer;