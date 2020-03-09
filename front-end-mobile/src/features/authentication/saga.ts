import { SagaOrchestrator } from 'lib/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import { signInRequest, signInSuccess } from './actions';
import { Action } from 'lib/types/action';
import { put } from 'redux-saga/effects';

const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeEvery(getType(signInRequest), function* (action: Action) {
    const payload = (action as ReturnType<typeof signInRequest>).payload;
    yield put(signInSuccess({token: `fake_token_for_${payload.username}_${payload.password}`}));
  });

export default orchestrator;