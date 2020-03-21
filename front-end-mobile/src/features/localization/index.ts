import i18n from 'i18next';
import languageDetector from './languageDetector';
import { extension, SKey } from 'res/strings';

import * as vietnameseTranslation from './translations/vi.json';

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
};

export const localization = {
  install,
};