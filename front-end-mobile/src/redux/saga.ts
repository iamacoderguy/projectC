import { SagaOrchestrator } from 'lib/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import {
  finishAuthenticationRequest,
  finishAuthenticationSuccess,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
} from '../actions';
import { Action } from 'lib/types/action';
import { put, select } from 'redux-saga/effects';
import { localizer } from 'features/localization';
import { RootState } from '../types/rootState';
import appTag from '../constants/tag';

const tag = 'SAGA';
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeEvery(getType(finishAuthenticationRequest), function* (action: Action) {
    console.log(`${appTag} - ${tag} - ${getType(finishAuthenticationRequest)}`);
    const credentials = (action as ReturnType<typeof finishAuthenticationRequest>).payload;
    console.warn(credentials);

    // TODO
    // yield call(saveCredentials, token);
    // yield put(finishAuthenticationSuccess());
  })

  .takeEvery(getType(installLocalizationRequest), function* () {
    console.log(`${appTag} - ${tag} - ${getType(installLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (!isLocalizationInstalled) {
      localizer.install();
      yield put(installLocalizationSuccess());
    }
  })

  .takeEvery(getType(uninstallLocalizationRequest), function* () {
    console.log(`${appTag} - ${tag} - ${getType(uninstallLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (isLocalizationInstalled) {
      localizer.uninstall();
      yield put(uninstallLocalizationSuccess());
    }
  })
;

export default orchestrator;