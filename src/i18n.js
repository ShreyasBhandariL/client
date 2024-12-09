import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translate/en.json';
import kn from './translate/kn.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    kn: { translation: kn },
  },
  lng: 'en', // default language
  fallbackLng: 'en', // fallback language if translation is missing
  interpolation: { escapeValue: false },
});

export default i18n;
