import { SagaOrchestrator } from 'shared/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import { 
  initialize,
  renewToken,
  authenticated, 
  signOutRequest,
  signOutSuccess,
  goToSignUp,
  goToSignIn,
  goToForgotPassword,
} from './actions';
import { Action } from 'shared/types/action';
import { call, put, select } from 'redux-saga/effects';
import { navigate } from 'shared/utils/navigation';
import navigationMap from '../constants/navigationMap';
import auth0, { Credentials } from '../utils/auth0';
import { RootState } from '../types/rootState';
import MODULE_TAG from '../constants/tag';
import apiFetcher from 'shared/utils/apiFetcher';
import { jwtErrorHandler } from '../utils/jwtErrorHandler';
import storeManager from '../utils/storeManager';

const TAG = `${MODULE_TAG} - SAGA`;
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(`${MODULE_TAG} - ${TAG} - ${error}`);
  return true;
});

orchestrator
  .takeLatest(getType(initialize), function* (action: Action) {
    console.info(`${TAG} - ${getType(initialize)}`);
    const authProps = (action as ReturnType<typeof initialize>).payload;

    if (!authProps.refreshToken) {
      yield call(navigate, navigationMap.SignIn);
      return;
    }

    yield put(renewToken(authProps.refreshToken));
  })

  .takeLatest(getType(renewToken), function* (action: Action) {
    console.info(`${TAG} - ${getType(renewToken)}`);
    const refreshToken = (action as ReturnType<typeof renewToken>).payload;
    const state: RootState = yield select();
    try {
      const credentials: Credentials = yield call(auth0.renewToken, refreshToken); 
      yield put(authenticated(credentials));
    } catch (error) {
      yield call(navigate, navigationMap.SignIn);

      if (state.onSignedOut) {
        state.onSignedOut();
      }

      throw error;
    }
  })

  .takeLatest(getType(authenticated), function* (action: Action) {
    console.info(`${TAG} - ${getType(authenticated)}`);
    const credentials = (action as ReturnType<typeof authenticated>).payload;
    const state: RootState = yield select();
    
    if (!state.testMode && !state.onAuthenticated) {
      console.warn(`${TAG} - It isn't in test mode, neither is onAuthenticated provided`);
    }

    if (state.testMode) {
      const _jwtErrorHandler = jwtErrorHandler(
        async () => {
          const newCredentials = await auth0.renewToken(credentials.refreshToken);
          apiFetcher.setToken(newCredentials.accessToken);
          storeManager.getStore()?.dispatch(authenticated(newCredentials));
        },
        async () => {
          auth0.signOut(credentials.refreshToken);
          navigate(navigationMap.SignIn);
        },
        true,
      );
      
      yield call(apiFetcher.setErrorHandler, _jwtErrorHandler); 
      yield call(navigate, navigationMap.SignOut);
    }

    if (state.onAuthenticated) {
      yield call(state.onAuthenticated, credentials);
      return;
    }
  })

  .takeLatest(getType(signOutRequest), function* (action: Action) {
    console.info(`${TAG} - ${getType(signOutRequest)}`);
    const sub = (action as ReturnType<typeof signOutRequest>).payload;
    const state: RootState = yield select();
    yield call(auth0.signOut, state.refreshToken, sub);
    yield put(signOutSuccess());

    if (!state.testMode && !state.onSignedOut) {
      console.warn(`${TAG} - It isn't in test mode, neither is onSignedOut provided`);
    }

    if (state.testMode) {
      yield call(navigate, navigationMap.SignIn);
    }

    if (state.onSignedOut) {
      state.onSignedOut();
      return;
    }
  })

  .takeLatest(getType(goToSignUp), function* () {
    yield call(navigate, navigationMap.SignUp);
  })

  .takeLatest(getType(goToSignIn), function* () {
    yield call(navigate, navigationMap.SignIn);
  })

  .takeLatest(getType(goToForgotPassword), function* () {
    yield call(navigate, navigationMap.ForgotPassword);
  })
;

export default orchestrator;
