'use client';

import { useEffect, createContext, useContext, useState } from 'react';
import ScrollToTopOnRefresh from './components/ScrollToTopOnRefresh';

// Create a context for language
export const LanguageContext = createContext({
  locale: 'en',
  setLocale: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function ClientWrapper({ children, locale }) {
  const [currentLocale, setCurrentLocale] = useState(locale || 'en');

  useEffect(() => {
    if (locale && locale !== currentLocale) {
      setCurrentLocale(locale);
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale: currentLocale, setLocale: setCurrentLocale }}>
      <ScrollToTopOnRefresh />
      <main className="flex-grow">{children}</main>
    </LanguageContext.Provider>
  );
} 