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
} from './actions';
import { Action } from 'shared/types/action';
import { call, put, select } from 'redux-saga/effects';
import { navigate } from 'shared/utils/navigation';
import navigationMap from '../constants/navigationMap';
import * as auth0 from '../utils/auth0';
import { RootState } from '../types/rootState';
import MODULE_TAG from '../constants/tag';

const TAG = 'SAGA';
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeLatest(getType(initialize), function* (action: Action) {
    console.info(`${MODULE_TAG} - ${TAG} - ${getType(initialize)}`);
    const authProps = (action as ReturnType<typeof initialize>).payload;

    if (!authProps.refreshToken) {
      yield call(navigate, navigationMap.SignIn);
      return;
    }

    yield put(renewToken(authProps.refreshToken));
  })

  .takeLatest(getType(renewToken), function* (action: Action) {
    console.info(`${MODULE_TAG} - ${TAG} - ${getType(renewToken)}`);
    const refreshToken = (action as ReturnType<typeof renewToken>).payload;
    const state: RootState = yield select();
    try {
      const credentials: auth0.Credentials = yield call(auth0.renewToken, refreshToken); 
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
    console.info(`${MODULE_TAG} - ${TAG} - ${getType(authenticated)}`);
    const credentials = (action as ReturnType<typeof authenticated>).payload;
    const state: RootState = yield select();

    if (state.testMode) {
      yield call(navigate, navigationMap.SignOut);
      return;
    }

    if (state.onAuthenticated) {
      yield call(state.onAuthenticated, credentials);
      return;
    }

    console.warn(`${TAG} - It isn't in test mode, neither is onAuthenticated provided`);
  })

  .takeLatest(getType(signOutRequest), function* (action: Action) {
    console.info(`${MODULE_TAG} - ${TAG} - ${getType(signOutRequest)}`);
    const sub = (action as ReturnType<typeof signOutRequest>).payload;
    const state: RootState = yield select();
    yield call(auth0.signOut, state.refreshToken, sub);
    yield put(signOutSuccess());

    if (state.testMode) {
      yield call(navigate, navigationMap.SignIn);
      return;
    }

    if (state.onSignedOut) {
      state.onSignedOut();
      return;
    }

    console.warn(`${TAG} - It isn't in test mode, neither is onSignedOut provided`);
  })

  .takeLatest(getType(goToSignUp), function* () {
    yield call(navigate, navigationMap.SignUp);
  })

  .takeLatest(getType(goToSignIn), function* () {
    yield call(navigate, navigationMap.SignIn);
  })
;

export default orchestrator;