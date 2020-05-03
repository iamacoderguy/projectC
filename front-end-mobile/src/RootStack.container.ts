import { Dispatch } from 'redux';
import { RootState } from './types/rootState';
import {
  finishLoadingRequest,
  finishAuthenticationRequest,
  installLocalizationRequest,
  uninstallLocalizationRequest,
} from './actions';

export enum Stage {
  'Loading',
  'Authenticating',
  'InApp',
}

// === mapStateToProps ===
export type RootStackPropsForMapState = {
  stage: Stage;
}
export function mapStateToProps(state: RootState): RootStackPropsForMapState {
  return {
    stage: getActivatedStage(state),
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
  return state.inApp !== undefined && false;  // TODO && loadCredentials() !== '';
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

  if (stage == Stage.Loading) {
    setTimeout(() => dispatch(finishLoadingRequest()), 2000);
  }
};

const handleAppFinished = (dispatch: Dispatch) => {
  dispatch(uninstallLocalizationRequest());
};