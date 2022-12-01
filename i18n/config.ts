import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './locales';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translations: locales.en.translations,
      foods: locales.en.foods,
    },
    pt: {
      translations: locales.pt.translations,
      foods: locales.pt.foods,
    },
  },
  ns: ['translations', 'foods'],
  defaultNS: 'translations',
  debug: process.env.NODE_ENV === 'development',
});

i18n.languages = ['en', 'pt'];

export default i18n;
