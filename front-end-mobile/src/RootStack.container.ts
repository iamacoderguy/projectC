import { Dispatch } from 'redux';
import { RootState } from './reducer';
import { 
  finishLoadingRequest,
  finishAuthenticationRequest,
  installLocalizationRequest,
  uninstallLocalizationRequest,
} from './actions';
import { loadCredentials } from 'lib/utils/storage';
import { RootStackPropsForMapState, RootStackPropsForMapDispatch } from './RootStack';

export enum Stage {
  'Loading',
  'Authenticating',
  'InApp',
}

// === mapStateToProps ===
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
  return state.inApp !== undefined && loadCredentials() !== '';
};

// === mapDispatchToProps ===
export function mapDispatchToProps(dispatch: Dispatch): RootStackPropsForMapDispatch {
  return {
    onAppStarted: (stage: Stage) => handleAppStarted(dispatch, stage),
    onAppFinished: () => handleAppFinished(dispatch),
    onAuthenticationFinished: (token: string) => dispatch(finishAuthenticationRequest({ token })),
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