import { createAction } from 'typesafe-actions';

const makeType = (type: string) => {
  return 'APP_' + type;
};

export const finishLoadingRequest = createAction(makeType('FINISH_LOADING_REQUEST'))();

export const finishAuthenticationRequest = createAction(makeType('FINISH_AUTHENTICATING_REQUEST'))<{ token: string }>();
export const finishAuthenticationSuccess = createAction(makeType('FINISH_AUTHENTICATING_SUCCESS'))();

export const changeLanguageSuccess = createAction(makeType('CHANGE_LANGUAGE_SUCCESS'))<{lng: string}>();

export const installLocalizationRequest = createAction(makeType('INSTALL_LOCALIZATION_REQUEST'))();
export const installLocalizationSuccess = createAction(makeType('INSTALL_LOCALIZATION_SUCCESS'))();
export const uninstallLocalizationRequest = createAction(makeType('UNINSTALL_LOCALIZATION_REQUEST'))();
export const uninstallLocalizationSuccess = createAction(makeType('UNINSTALL_LOCALIZATION_SUCCESS'))();