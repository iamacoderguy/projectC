import { Action } from 'shared/types/action';
import { getType } from 'typesafe-actions';
import { 
  handleOnAuthenticatedSuccess,
  changeLanguageSuccess,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
  installAuthenticationSuccess,
  handleOnSignedOutSuccess,
} from './actions';
import { RootState } from '../types/rootState';
import APP_TAG from '../constants/tag';

const TAG = 'REDUCER';
const initialState: RootState = {};

function rootReducer (
  previousState: RootState = initialState,
  action: Action,
): RootState {
  switch (action.type) {
    case getType(installAuthenticationSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(installAuthenticationSuccess)}`);
      return {
        ...previousState,
        auth: (action as ReturnType<typeof installAuthenticationSuccess>).payload,
      };

    case getType(handleOnSignedOutSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(handleOnSignedOutSuccess)}`);
      return {
        ...previousState,
        auth: {
          refreshToken: undefined,
        },
      };
    
    case getType(handleOnAuthenticatedSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(handleOnAuthenticatedSuccess)}`);
      return { ...previousState, auth: undefined, inApp: {} };

    case getType(changeLanguageSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(changeLanguageSuccess)}`);
      return { ...previousState, lng: (action as ReturnType<typeof changeLanguageSuccess>).payload.lng };

    case getType(installLocalizationSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(installLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: true};

    case getType(uninstallLocalizationSuccess):
      console.info(`${APP_TAG} - ${TAG} - ${getType(uninstallLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: false};

    default:
      return previousState;
  }
}

export default rootReducer;