import { SagaOrchestrator } from 'shared/utils/sagaOrchestrator';
import { getType } from 'typesafe-actions';
import {
  handleOnAuthenticatedRequest,
  handleOnAuthenticatedSuccess,
  installLocalizationRequest,
  uninstallLocalizationRequest,
  installLocalizationSuccess,
  uninstallLocalizationSuccess,
  installAuthenticationRequest,
  installAuthenticationSuccess,
  handleOnSignedOutRequest,
  handleOnSignedOutSuccess,
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
import apiFetcher from 'shared/utils/apiFetcher';

const tag = 'SAGA';
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(error);
  return true;
});

orchestrator
  .takeLatest(getType(installAuthenticationRequest), function* (action: Action) {
    console.info(`${appTag} - ${tag} - ${getType(installAuthenticationRequest)}`);
    const refreshToken: string | undefined = yield call(storage.loadCredentials, 'refreshToken');
    const idToken: string | undefined = yield call(storage.loadCredentials, 'idToken');
    yield put(installAuthenticationSuccess({ refreshToken, idToken }));
  })

  .takeLatest(getType(handleOnAuthenticatedRequest), function* (action: Action) {
    console.info(`${appTag} - ${tag} - ${getType(handleOnAuthenticatedRequest)}`);
    const credentials = (action as ReturnType<typeof handleOnAuthenticatedRequest>).payload;

    yield call(storage.saveCredentials, 'refreshToken', credentials.refreshToken || '');
    yield call(storage.saveCredentials, 'idToken', credentials.idToken);
    yield call(apiFetcher.setToken, credentials.accessToken);
    yield put(handleOnAuthenticatedSuccess());
  })

  .takeLatest(getType(handleOnSignedOutRequest), function* (action: Action) {
    console.info(`${appTag} - ${tag} - ${getType(handleOnSignedOutRequest)}`);

    yield call(storage.saveCredentials, 'refreshToken', '');
    yield call(apiFetcher.setToken, '');
    yield put(handleOnSignedOutSuccess());
  })

  .takeLatest(getType(installLocalizationRequest), function* () {
    console.info(`${appTag} - ${tag} - ${getType(installLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (!isLocalizationInstalled) {
      localizer.install();
      yield put(installLocalizationSuccess());
    }
  })

  .takeLatest(getType(uninstallLocalizationRequest), function* () {
    console.info(`${appTag} - ${tag} - ${getType(uninstallLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (isLocalizationInstalled) {
      localizer.uninstall();
      yield put(uninstallLocalizationSuccess());
    }
  })
;

export default orchestrator;