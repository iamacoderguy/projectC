import { Action } from 'lib/types/action';
import {
  authenticated,
  initialize,
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
        refreshToken: (action as ReturnType<typeof initialize>).payload.refreshToken,
        testMode: !!(action as ReturnType<typeof initialize>).payload.testMode,
        onAuthenticated: (action as ReturnType<typeof initialize>).payload.onAuthenticated,
      };

    case getType(authenticated):
      console.log(`${moduleTag} - ${tag} - ${getType(authenticated)}`);
      return {
        ...previousState,
        accessToken: (action as ReturnType<typeof authenticated>).payload.accessToken,
        refreshToken: (action as ReturnType<typeof authenticated>).payload.refreshToken,
      };

    default:
      return previousState;
  }
}

export default rootReducer;