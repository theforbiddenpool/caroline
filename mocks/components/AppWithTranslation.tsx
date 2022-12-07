import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { en } from '../../i18n/locales';

interface AppWithTranslationProps {
  children: React.ReactNode;
}

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    resources: {
      en: {
        translations: en.translations,
      },
    },
  });

function AppWithTranslation({ children }: AppWithTranslationProps) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}

export default AppWithTranslation;
