import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const initI18n = async () => {
  // Skip initialization if already initialized
  if (i18n.isInitialized) return i18n;

  await i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    });

  return i18n;
};

// Expose a function to change the language
export const changeLanguage = (language) => {
  return i18n.changeLanguage(language);
};

export default initI18n; 