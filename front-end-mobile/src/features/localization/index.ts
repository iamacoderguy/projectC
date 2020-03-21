import i18n from 'i18next';
import languageDetector from './languageDetector';
import { extension, SKey } from 'res/strings';

import * as vietnameseTranslation from './translations/vi.json';

import * as RNLocalize from 'react-native-localize';

const install = () => {
  i18n.use(languageDetector).init({
    debug: false,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: extension.oriTranslation,
      },
      vi: {
        translation: vietnameseTranslation,
      },
    },
  });

  extension.install({
    t: (key: SKey) => i18n.t(key),
  });

  RNLocalize.addEventListener('change', handleLocalizationChange);
  console.warn('subscribed to');
  console.warn(handleLocalizationChange);
};

const uninstall = () => {
  RNLocalize.removeEventListener('change', handleLocalizationChange);
  console.warn('subscribed to');
  console.warn(handleLocalizationChange);
};

const handleLocalizationChange = async () => {
  const systemLanguage = RNLocalize.getLocales()[0].languageCode;
  await i18n.changeLanguage(systemLanguage);
};

const getLanguageCodeOnly = () => {
  let language = i18n.language;
  if (language.indexOf('-') !== -1) {
    language = language.substring(0, language.indexOf('-'));
  }

  return language;
};

const changeLanguage = async (lng: string) => {
  await i18n.changeLanguage(lng);
};

export const localizer = {
  install,
  uninstall,
  getLanguageCodeOnly,
  changeLanguage,
};