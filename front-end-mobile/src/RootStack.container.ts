import { Dispatch } from 'redux';
import { RootState } from './types/rootState';
import {
  handleOnAuthenticatedRequest,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installAuthenticationRequest,
  handleOnSignedOutRequest,
} from './redux/actions';
import * as apiFetcher from 'shared/utils/apiFetcher';
import { isNullOrWhitespace } from 'shared/utils/string';
import { Credentials } from 'shared/types/credentials';

export enum Stage {
  'Loading',
  'Authenticating',
  'InApp',
}

// === mapStateToProps ===
export type RootStackPropsForMapState = {
  stage: Stage;
  refreshToken?: string;
  idToken?: string;
}
export function mapStateToProps(state: RootState): RootStackPropsForMapState {
  return {
    stage: getActivatedStage(state),
    refreshToken: state.auth?.refreshToken,
    idToken: state.auth?.idToken,
  };
}

const getActivatedStage = (state: RootState) => {
  if (isAuthStageReady(state)) {
    return Stage.Authenticating;
  }

  if (isInAppStageReady(state)) {
    return Stage.InApp;
  }

  return Stage.Loading;
};

const isAuthStageReady = (state: RootState) => {
  return state.auth !== undefined;
};

const isInAppStageReady = (state: RootState) => {
  return state.inApp !== undefined && 
    !isNullOrWhitespace(apiFetcher.getToken());
};

// === mapDispatchToProps ===
export type RootStackPropsForMapDispatch = {
  onAppStarted: (stage: Stage) => void;
  onAppFinished: () => void;
  onAuthenticated: (credentials: Credentials) => void;
  onSignedOut: () => void;
}
export function mapDispatchToProps(dispatch: Dispatch): RootStackPropsForMapDispatch {
  return {
    onAppStarted: (stage: Stage) => handleAppStarted(dispatch, stage),
    onAppFinished: () => handleAppFinished(dispatch),
    onAuthenticated: (credentials: Credentials) => dispatch(handleOnAuthenticatedRequest(credentials)),
    onSignedOut: () => dispatch(handleOnSignedOutRequest()),
  };
}

const handleAppStarted = (dispatch: Dispatch, stage: Stage) => {
  dispatch(installLocalizationRequest());
  dispatch(installAuthenticationRequest());
};

const handleAppFinished = (dispatch: Dispatch) => {
  dispatch(uninstallLocalizationRequest());
};