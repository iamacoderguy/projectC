import { SagaOrchestrator } from 'lib/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import { initialize, renewToken, authenticated } from './actions';
import { Action } from 'lib/types/action';
import { call, put, select } from 'redux-saga/effects';
import { navigate } from 'lib/utils/navigation';
import navigationMap from '../constants/navigationMap';
import * as auth0 from '../utils/auth0';
import { RootState } from '../types/rootState';
import moduleTag from '../constants/tag';

const tag = 'SAGA';
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeLatest(getType(initialize), function* (action: Action) {
    console.log(`${moduleTag} - ${tag} - ${getType(initialize)}`);
    const authProps = (action as ReturnType<typeof initialize>).payload;

    if (!authProps.refreshToken) {
      yield call(navigate, navigationMap.SignIn);
      return;
    }

    yield put(renewToken(authProps.refreshToken));
  })

  .takeLatest(getType(renewToken), function* (action: Action) {
    console.log(`${moduleTag} - ${tag} - ${getType(renewToken)}`);
    const refreshToken = (action as ReturnType<typeof renewToken>).payload;
    try {
      const credentials: auth0.Credentials = yield call(auth0.renewToken, refreshToken); 
      yield put(authenticated(credentials));
    } catch (error) {
      yield call(navigate, navigationMap.SignIn);
      throw error;
    }
  })

  .takeLatest(getType(authenticated), function* (action: Action) {
    console.log(`${moduleTag} - ${tag} - ${getType(authenticated)}`);
    const credentials = (action as ReturnType<typeof authenticated>).payload;
    const state: RootState = yield select();

    if (state.testMode) {
      yield call(navigate, navigationMap.SignOut);
      return;
    }

    if (state.onAuthenticated) {
      yield call(state.onAuthenticated, credentials.accessToken, credentials.refreshToken);
      return;
    }

    console.warn(`${tag} - It isn't in test mode, neither is onAuthenticated provided`);
  })
;

export default orchestrator;