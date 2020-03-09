import { Dispatch } from 'redux';
import { RootState } from './reducer';
import { finishLoadingRequest, finishAuthenticationRequest } from './actions';
import { loadCredentials } from 'lib/utils/storage';

export enum Stage {
  'Loading',
  'Authenticating',
  'InApp',
}

// === mapStateToProps ===

export const mapStateToProps = (state: RootState) => ({
  stage: getActivatedStage(state),
});

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

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadingStarted: () => handleLoadingStarted(dispatch),
  onAuthenticationFinished: (token: string) => dispatch(finishAuthenticationRequest({ token })),
});

const handleLoadingStarted = (dispatch: Dispatch) => {
  setTimeout(() => dispatch(finishLoadingRequest()), 2000);
};