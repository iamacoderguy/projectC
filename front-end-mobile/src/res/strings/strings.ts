import * as oriStrings from './en.json';
import { format } from 'lib/utils/string';

export const oriTranslation = oriStrings;
export type SKey = keyof typeof oriStrings;

interface ILocalizer {
  t: (key: SKey) => string;
}

const defaultLocalizer = {
  t: (key: SKey) => {
    return oriStrings[key];
  },
};
let _localizer: ILocalizer = defaultLocalizer;

export const install = (localizer: ILocalizer) => {
  _localizer = localizer;
};
export const uninstall = () => {
  _localizer = defaultLocalizer;
};

export const strings = {
  authentication: {
    signIn: {
      signInButtonTitle: () => _localizer.t('authentication_signIn_signInButtonTitle'),
    },
    signUp: {
      title: () => _localizer.t('authentication_signUp_title'),
      usernamePlaceholder: () => _localizer.t('authentication_signUp_usernamePlaceholder'),
      emailPlaceholder: () => _localizer.t('authentication_signUp_emailPlaceholder'),
      displayNamePlaceholder: () => _localizer.t('authentication_signUp_displayNamePlaceholder'),
      passwordPlaceholder: () => _localizer.t('authentication_signUp_passwordPlaceholder'),
      confirmPasswordPlaceholder: () => _localizer.t('authentication_signUp_confirmPasswordPlaceholder'),
      signUpButton: () => _localizer.t('authentication_signUp_signUpButton'),
      alreadyHaveAnAccount: () => _localizer.t('authentication_signUp_alreadyHaveAnAccount'),
      signUpWithGithubButton: () => _localizer.t('authentication_signUp_signUpWithGithubButton'),
      signUpWithGoogleButton: () => _localizer.t('authentication_signUp_signUpWithGoogleButton'),
      agreeWithTermsOfService: () => _localizer.t('authentication_signUp_agreeWithTermsOfService'),
      termsOfServiceLink: () => _localizer.t('authentication_signUp_termsOfServiceLink'),
      validationMessageRequired: (fieldName: string) => format(_localizer.t('authentication_validationMessage_required'), fieldName),
      validationMessageMinLength: (fieldName: string, minLength: number) => format(_localizer.t('authentication_validationMessage_minLength'), fieldName, minLength),
      validationMessageMaxLength: (fieldName: string, maxLength: number) => format(_localizer.t('authentication_validationMessage_maxLength'), fieldName, maxLength),
      validationMessageEmail: (fieldName: string) => format(_localizer.t('authentication_validationMessage_email'), fieldName),
      validationMessageCharactersAllowed: (fieldName: string, specialCharacters: string) => format(_localizer.t('authentication_validationMessage_charactersAllowed'), fieldName, specialCharacters),
      validationMessageDoesNotMatch: (fieldName: string) => format(_localizer.t('authentication_validationMessage_doesNotMatch'), fieldName),
    },
    components: {
      show: () => _localizer.t('authentication_components_show'),
      hide: () => _localizer.t('authentication_components_hide'),
      or: () => _localizer.t('authentication_components_or'),
    },
  },
  inAppTabs: {
    activitiesLabel: () => _localizer.t('inAppTabs_activitiesLabel'),
    buzzLabel: () => _localizer.t('inAppTabs_buzzLabel'),
    profileLabel: () => _localizer.t('inAppTabs_profileLabel'),
  },
};