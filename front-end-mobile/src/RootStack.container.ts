import { Dispatch } from 'redux';
import { RootState } from './types/rootState';
import {
  finishAuthenticationRequest,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installAuthenticationRequest,
} from './redux/actions';
import * as apiFetcher from 'shared/utils/apiFetcher';
import { isNullOrWhitespace } from 'shared/utils/string';

export enum Stage {
  'Loading',
  'Authenticating',
  'InApp',
}

// === mapStateToProps ===
export type RootStackPropsForMapState = {
  stage: Stage;
  refreshToken?: string;
}
export function mapStateToProps(state: RootState): RootStackPropsForMapState {
  return {
    stage: getActivatedStage(state),
    refreshToken: state.auth?.refreshToken,
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
  onAuthenticationFinished: (accessToken: string, refreshToken?: string) => void;
}
export function mapDispatchToProps(dispatch: Dispatch): RootStackPropsForMapDispatch {
  return {
    onAppStarted: (stage: Stage) => handleAppStarted(dispatch, stage),
    onAppFinished: () => handleAppFinished(dispatch),
    onAuthenticationFinished: (accessToken: string, refreshToken?: string) => dispatch(finishAuthenticationRequest({ accessToken, refreshToken })),
  };
}

const handleAppStarted = (dispatch: Dispatch, stage: Stage) => {
  dispatch(installLocalizationRequest());
  dispatch(installAuthenticationRequest());
};

const handleAppFinished = (dispatch: Dispatch) => {
  dispatch(uninstallLocalizationRequest());
};