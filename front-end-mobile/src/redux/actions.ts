import { createAction } from 'typesafe-actions';
import { Credentials } from 'shared/types/credentials';
import tag from '../constants/tag';
import { AuthState } from '../types/rootState';

const makeType = (type: string) => {
  return `${tag}_${type}`;
};

export const installAuthenticationRequest = createAction(makeType('INSTALL_AUTHENTICATION_REQUEST'))();
export const installAuthenticationSuccess = createAction(makeType('INSTALL_AUTHENTICATION_SUCCESS'))<AuthState>();
export const handleOnAuthenticatedRequest = createAction(makeType('HANDLE_ON_AUTHENTICATED_REQUEST'))<Credentials>();
export const handleOnAuthenticatedSuccess = createAction(makeType('HANDLE_ON_AUTHENTICATED_SUCCESS'))();
export const handleOnSignedOutRequest = createAction(makeType('HANDLE_ON_SIGNED_OUT_REQUEST'))();
export const handleOnSignedOutSuccess = createAction(makeType('HANDLE_ON_SIGNED_OUT_SUCCESS'))();

export const changeLanguageSuccess = createAction(makeType('CHANGE_LANGUAGE_SUCCESS'))<{lng: string}>();

export const installLocalizationRequest = createAction(makeType('INSTALL_LOCALIZATION_REQUEST'))();
export const installLocalizationSuccess = createAction(makeType('INSTALL_LOCALIZATION_SUCCESS'))();
export const uninstallLocalizationRequest = createAction(makeType('UNINSTALL_LOCALIZATION_REQUEST'))();
export const uninstallLocalizationSuccess = createAction(makeType('UNINSTALL_LOCALIZATION_SUCCESS'))();