import { SagaOrchestrator } from 'shared/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import {
  finishAuthenticationRequest,
  finishAuthenticationSuccess,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
  installAuthenticationRequest,
  installAuthenticationSuccess,
} from './actions';
import { Action } from 'shared/types/action';
import { 
  put,
  select,
  call,
} from 'redux-saga/effects';
import { localizer } from 'features/localization';
import { RootState } from '../types/rootState';
import appTag from '../constants/tag';
import * as storage from '../utils/storage';
import * as apiFetcher from 'shared/utils/apiFetcher';

const tag = 'SAGA';
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeLatest(getType(installAuthenticationRequest), function* (action: Action) {
    console.log(`${appTag} - ${tag} - ${getType(installAuthenticationRequest)}`);
    const refreshToken = yield call(storage.loadCredentials, 'refreshToken');
    yield put(installAuthenticationSuccess(refreshToken));
  })

  .takeLatest(getType(finishAuthenticationRequest), function* (action: Action) {
    console.log(`${appTag} - ${tag} - ${getType(finishAuthenticationRequest)}`);
    const credentials = (action as ReturnType<typeof finishAuthenticationRequest>).payload;

    yield call(storage.saveCredentials, 'refreshToken', credentials.refreshToken || '');
    yield call(apiFetcher.setToken, credentials.accessToken);
    yield put(finishAuthenticationSuccess());
  })

  .takeLatest(getType(installLocalizationRequest), function* () {
    console.log(`${appTag} - ${tag} - ${getType(installLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (!isLocalizationInstalled) {
      localizer.install();
      yield put(installLocalizationSuccess());
    }
  })

  .takeLatest(getType(uninstallLocalizationRequest), function* () {
    console.log(`${appTag} - ${tag} - ${getType(uninstallLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (isLocalizationInstalled) {
      localizer.uninstall();
      yield put(uninstallLocalizationSuccess());
    }
  })
;

export default orchestrator;