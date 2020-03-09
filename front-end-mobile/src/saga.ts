import { SagaOrchestrator } from 'lib/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import { finishAuthenticationRequest, finishAuthenticationSuccess } from './actions';
import { Action } from 'lib/types/action';
import { saveCredentials } from 'lib/utils/storage';
import { call, put } from 'redux-saga/effects';

const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeEvery(getType(finishAuthenticationRequest), function* (action: Action) {
    const token = (action as ReturnType<typeof finishAuthenticationRequest>).payload.token;
    yield call(saveCredentials, token);
    yield put(finishAuthenticationSuccess());
  });

export default orchestrator;