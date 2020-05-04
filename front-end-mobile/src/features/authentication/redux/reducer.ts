import { Action } from 'shared/types/action';
import {
  authenticated,
  initialize,
  signOutSuccess,
} from './actions';
import { getType } from 'typesafe-actions';
import { RootState } from '../types/rootState';
import moduleTag from '../constants/tag';

const tag = 'REDUCER';
const initialState: RootState = {
  testMode: false,
};

function rootReducer(previousState: RootState = initialState, action: Action): RootState {
  switch (action.type) {
    case getType(initialize):
      console.log(`${moduleTag} - ${tag} - ${getType(initialize)}`);
      return {
        ...previousState,
        ...(action as ReturnType<typeof initialize>).payload,
      };

    case getType(authenticated):
      console.log(`${moduleTag} - ${tag} - ${getType(authenticated)}`);
      return {
        ...previousState,
        accessToken: (action as ReturnType<typeof authenticated>).payload.accessToken,
        idToken: (action as ReturnType<typeof authenticated>).payload.idToken,
        refreshToken: (action as ReturnType<typeof authenticated>).payload.refreshToken,
      };

    case getType(signOutSuccess):
      console.log(`${moduleTag} - ${tag} - ${getType(signOutSuccess)}`);
      return {
        ...previousState,
        accessToken: undefined,
        refreshToken: undefined,
      };

    default:
      return previousState;
  }
}

export default rootReducer;