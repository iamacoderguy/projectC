import { NativeModules, Platform } from 'react-native';
import { LanguageDetectorModule, Services, InitOptions } from 'i18next';

const getLanguageCode = () => {
  let systemLanguage = 'en';
  if (Platform.OS === 'android') {
    systemLanguage = NativeModules.I18nManager.localeIdentifier;
  } else {
    systemLanguage = NativeModules.SettingsManager ?
      ( NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] ) // iOS 13+
      : systemLanguage;
  }
  return systemLanguage.replace('_', '-');
};

const module: LanguageDetectorModule = {
  init: (
    _services: Services,
    _detectorOptions: object,
    _i18nextOptions: InitOptions,
  ) => { },
  type: 'languageDetector',
  detect: getLanguageCode,
  cacheUserLanguage: (_lng: string) => { },
};

export default module;
