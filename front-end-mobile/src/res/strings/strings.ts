import * as oriStrings from './en.json';

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
      displayNamePlaceholder: () => _localizer.t('authentication_signUp_displayNamePlaceholder'),
      passwordPlaceholder: () => _localizer.t('authentication_signUp_passwordPlaceholder'),
      confirmPasswordPlaceholder: () => _localizer.t('authentication_signUp_confirmPasswordPlaceholder'),
      signUpButton: () => _localizer.t('authentication_signUp_signUpButton'),
      signUpWithGithubButton: () => _localizer.t('authentication_signUp_signUpWithGithubButton'),
      signUpWithGoogleButton: () => _localizer.t('authentication_signUp_signUpWithGoogleButton'),
      agreeWithTermsOfService: () => _localizer.t('authentication_signUp_agreeWithTermsOfService'),
      termsOfServiceLink: () => _localizer.t('authentication_signUp_termsOfServiceLink'),
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