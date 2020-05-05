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
import appTag from '../constants/tag';

const tag = 'REDUCER';
const initialState: RootState = {};

function rootReducer (
  previousState: RootState = initialState,
  action: Action,
): RootState {
  switch (action.type) {
    case getType(installAuthenticationSuccess):
      console.info(`${appTag} - ${tag} - ${getType(installAuthenticationSuccess)}`);
      return {
        ...previousState,
        auth: (action as ReturnType<typeof installAuthenticationSuccess>).payload,
      };

    case getType(handleOnSignedOutSuccess):
      console.info(`${appTag} - ${tag} - ${getType(handleOnSignedOutSuccess)}`);
      return {
        ...previousState,
        auth: {
          refreshToken: undefined,
        },
      };
    
    case getType(handleOnAuthenticatedSuccess):
      console.info(`${appTag} - ${tag} - ${getType(handleOnAuthenticatedSuccess)}`);
      return { ...previousState, auth: undefined, inApp: {} };

    case getType(changeLanguageSuccess):
      console.info(`${appTag} - ${tag} - ${getType(changeLanguageSuccess)}`);
      return { ...previousState, lng: (action as ReturnType<typeof changeLanguageSuccess>).payload.lng };

    case getType(installLocalizationSuccess):
      console.info(`${appTag} - ${tag} - ${getType(installLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: true};

    case getType(uninstallLocalizationSuccess):
      console.info(`${appTag} - ${tag} - ${getType(uninstallLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: false};

    default:
      return previousState;
  }
}

export default rootReducer;