import { Action } from 'shared/types/action';
import {
  authenticated,
  initialize,
  signOutSuccess,
  goToCheckEmail,
  checkEmailDone,
} from './actions';
import { getType } from 'typesafe-actions';
import { RootState } from '../types/rootState';
import MODULE_TAG from '../constants/tag';

const TAG = `${MODULE_TAG} - REDUCER`;
const initialState: RootState = {
  testMode: false,
};

function rootReducer(previousState: RootState = initialState, action: Action): RootState {
  switch (action.type) {
    case getType(initialize):
      console.info(`${TAG} - ${getType(initialize)}`);
      return {
        ...previousState,
        ...(action as ReturnType<typeof initialize>).payload,
      };

    case getType(authenticated):
      console.info(`${TAG} - ${getType(authenticated)}`);
      return {
        ...previousState,
        accessToken: (action as ReturnType<typeof authenticated>).payload.accessToken,
        idToken: (action as ReturnType<typeof authenticated>).payload.idToken,
        refreshToken: (action as ReturnType<typeof authenticated>).payload.refreshToken,
      };

    case getType(signOutSuccess):
      console.info(`${TAG} - ${getType(signOutSuccess)}`);
      return {
        ...previousState,
        accessToken: undefined,
        refreshToken: undefined,
      };

    case getType(goToCheckEmail):
      console.info(`${TAG} - ${getType(goToCheckEmail)}`);
      return {
        ...previousState,
        forgotPasswordForm: (action as ReturnType<typeof goToCheckEmail>).payload.selectedForm,
        forgotPasswordUsername: (action as ReturnType<typeof goToCheckEmail>).payload.username,
      };

    case getType(checkEmailDone):
      console.info(`${TAG} - ${getType(checkEmailDone)}`);
      return {
        ...previousState,
        forgotPasswordForm: undefined,
        forgotPasswordUsername: undefined,
      };

    default:
      return previousState;
  }
}

export default rootReducer;