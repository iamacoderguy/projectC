import { Action } from 'shared/types/action';
import { getType } from 'typesafe-actions';
import { 
  finishAuthenticationSuccess,
  changeLanguageSuccess,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
  installAuthenticationSuccess,
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
      console.log(`${appTag} - ${tag} - ${getType(installAuthenticationSuccess)}`);
      return {
        ...previousState,
        auth: {
          refreshToken: (action as ReturnType<typeof installAuthenticationSuccess>).payload,
        },
      };
    
    case getType(finishAuthenticationSuccess):
      console.log(`${appTag} - ${tag} - ${getType(finishAuthenticationSuccess)}`);
      return { ...previousState, auth: undefined, inApp: {} };

    case getType(changeLanguageSuccess):
      console.log(`${appTag} - ${tag} - ${getType(changeLanguageSuccess)}`);
      return { ...previousState, lng: (action as ReturnType<typeof changeLanguageSuccess>).payload.lng };

    case getType(installLocalizationSuccess):
      console.log(`${appTag} - ${tag} - ${getType(installLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: true};

    case getType(uninstallLocalizationSuccess):
      console.log(`${appTag} - ${tag} - ${getType(uninstallLocalizationSuccess)}`);
      return { ...previousState, isLocalizationInstalled: false};

    default:
      return previousState;
  }
}

export default rootReducer;