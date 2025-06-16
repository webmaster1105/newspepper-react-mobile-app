import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import bn from './locales/bn.json';
import en from './locales/en.json';
import hi from './locales/hi.json';
import ta from './locales/ta.json';

const resources = {
  "en": {translation: en},
  "hi": {translation: hi},
  "bn": {translation: bn},
  "ta": {translation: ta},
};

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
  
    if (!savedLanguage) {
      savedLanguage = Localization.locale;
    }
  
    i18n.use(initReactI18next).init({
      // compatibilityJSON: "v3",
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  };
  
  initI18n();
  
  export default i18n;