import { SagaOrchestrator } from 'lib/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import {
  finishAuthenticationRequest,
  finishAuthenticationSuccess,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
} from './actions';
import { Action } from 'lib/types/action';
import { put, select } from 'redux-saga/effects';
import { localizer } from 'features/localization';
import { RootState } from './reducer';

const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeEvery(getType(finishAuthenticationRequest), function* (action: Action) {
    // TODO
    // const token = (action as ReturnType<typeof finishAuthenticationRequest>).payload.token;
    // yield call(saveCredentials, token);
    yield put(finishAuthenticationSuccess());
  })

  .takeEvery(getType(installLocalizationRequest), function* () {
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (!isLocalizationInstalled) {
      localizer.install();
      yield put(installLocalizationSuccess());
    }
  })

  .takeEvery(getType(uninstallLocalizationRequest), function* () {
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (isLocalizationInstalled) {
      localizer.uninstall();
      yield put(uninstallLocalizationSuccess());
    }
  });

export default orchestrator;