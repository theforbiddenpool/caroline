import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translations: locales.en,
    },
    pt: {
      translations: locales.pt,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  debug: process.env.NODE_ENV === 'development',
});

i18n.languages = ['en', 'pt'];

export default i18n;
