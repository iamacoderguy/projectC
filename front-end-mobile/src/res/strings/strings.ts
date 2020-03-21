import * as oriStrings from './en.json';

export const oriTranslation = oriStrings;
export type SKey = keyof typeof oriStrings;

interface ILocalizer {
  t: (key: SKey) => string;
}

let _localizer: ILocalizer = {
  t: (key: SKey) => {
    return oriStrings[key];
  },
};

export const install = (localizer: ILocalizer) => {
  _localizer = localizer;
};

export const strings = {
  authentication: {
    signIn: {
      signInButtonTitle: () => _localizer.t('authentication_signIn_signInButtonTitle'),
    },
  },
  inAppTabs: {
    activitiesLabel: () => _localizer.t('inAppTabs_activitiesLabel'),
    buzzLabel: () => _localizer.t('inAppTabs_buzzLabel'),
    profileLabel: () => _localizer.t('inAppTabs_profileLabel'),
  },
};