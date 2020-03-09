import { Action } from 'lib/types/action';
import { getType } from 'typesafe-actions';
import { finishLoadingRequest, finishAuthenticationSuccess } from './actions';

export type RootState = {
  auth?: any,
  inApp?: any,
}

const initialState: RootState = {};

const rootReducer = (state: RootState = initialState, action: Action) => {
  switch (action.type) {
    case getType(finishLoadingRequest):
      return { ...state, auth: {}, inApp: undefined };
    
    case getType(finishAuthenticationSuccess):
      return { ...state, auth: undefined, inApp: {} };

    default:
      return state;
  }
};

export default rootReducer;