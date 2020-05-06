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
import * as storage from '../utils/storage';
import apiFetcher from 'shared/utils/apiFetcher';
import { 
  jwtErrorHandler, 
  auth0,
} from 'features/authentication';
import storeManager from '../utils/storeManager';
import APP_TAG from '../constants/tag';

const TAG = `${APP_TAG} - SAGA`;
const orchestrator = new SagaOrchestrator();
orchestrator.onError((error: Error) => {
  console.warn(`${APP_TAG} - ${TAG} - ${error}`);
  return true;
});

orchestrator
  .takeLatest(getType(installAuthenticationRequest), function* (action: Action) {
    console.info(`${TAG} - ${getType(installAuthenticationRequest)}`);
    const refreshToken: string | undefined = yield call(storage.loadCredentials, 'refreshToken');
    const idToken: string | undefined = yield call(storage.loadCredentials, 'idToken');
    yield put(installAuthenticationSuccess({ refreshToken, idToken }));
  })

  .takeLatest(getType(handleOnAuthenticatedRequest), function* (action: Action) {
    console.info(`${TAG} - ${getType(handleOnAuthenticatedRequest)}`);
    const credentials = (action as ReturnType<typeof handleOnAuthenticatedRequest>).payload;

    yield call(storage.saveCredentials, 'refreshToken', credentials.refreshToken || '');
    yield call(storage.saveCredentials, 'idToken', credentials.idToken);
    yield call(apiFetcher.setToken, credentials.accessToken);

    const _jwtErrorHandler = jwtErrorHandler(
      async () => {
        const newCredentials = await auth0.renewToken(credentials.refreshToken);
        apiFetcher.setToken(newCredentials.accessToken);
        storeManager.getStore()?.dispatch(handleOnAuthenticatedRequest(newCredentials));
      },
      async () => {
        console.warn(`${TAG} - should logged out`);
        // auth0.signOut(credentials.refreshToken);
        // navigate(navigationMap.SignIn);
      },
      true,
    );
    yield call(apiFetcher.setErrorHandler, _jwtErrorHandler);

    yield put(handleOnAuthenticatedSuccess());
  })

  .takeLatest(getType(handleOnSignedOutRequest), function* (action: Action) {
    console.info(`${TAG} - ${getType(handleOnSignedOutRequest)}`);

    yield call(storage.saveCredentials, 'refreshToken', '');
    yield call(apiFetcher.setToken, '');
    yield put(handleOnSignedOutSuccess());
  })

  .takeLatest(getType(installLocalizationRequest), function* () {
    console.info(`${TAG} - ${getType(installLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (!isLocalizationInstalled) {
      localizer.install();
      yield put(installLocalizationSuccess());
    }
  })

  .takeLatest(getType(uninstallLocalizationRequest), function* () {
    console.info(`${TAG} - ${getType(uninstallLocalizationRequest)}`);
    let isLocalizationInstalled: boolean | undefined = yield select((state: RootState) => state.isLocalizationInstalled);

    if (isLocalizationInstalled) {
      localizer.uninstall();
      yield put(uninstallLocalizationSuccess());
    }
  })
;

export default orchestrator;