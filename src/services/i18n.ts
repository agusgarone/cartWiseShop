import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locale/en.json';
import es from '../locale/es.json';
import it from '../locale/it.json';

i18n.use(initReactI18next).init({
  // compatibilityJSON: 'v3',
  lng: 'es',
  fallbackLng: 'en',
  resources: {
    en: {translation: en},
    es: {translation: es},
    it: {translation: it},
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
