'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useLanguage } from '../ClientWrapper';
import { useTranslation } from '../../lib/useTranslation';
import { usePathname } from 'next/navigation';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const { setLocale } = useLanguage();
  const pathname = usePathname();

  // Get the path without the locale
  const getPathWithoutLocale = useCallback((path) => {
    // If the path starts with a locale, remove it
    const locales = ['en', 'th'];
    for (const locale of locales) {
      if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
        return path.replace(`/${locale}`, '');
      }
    }
    return path;
  }, []);

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    const path = `/${newLocale}${pathWithoutLocale || ''}`;
    router.push(path);
  };

  return (
    <div className="relative flex items-center group">
      <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <span>{locale === 'th' ? 'ไทย' : 'English'}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute right-0 top-full mt-2 hidden w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block dark:bg-gray-800">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full px-4 py-2 text-left text-sm ${
              locale === 'en'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            role="menuitem"
          >
            {t('language.en')}
          </button>
          <button
            onClick={() => changeLanguage('th')}
            className={`block w-full px-4 py-2 text-left text-sm ${
              locale === 'th'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
            }`}
            role="menuitem"
          >
            {t('language.th')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 