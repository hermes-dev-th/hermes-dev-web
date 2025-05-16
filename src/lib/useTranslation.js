'use client';

import { useLanguage } from '../app/ClientWrapper';
import dictionary from './dictionary';

/**
 * Custom hook for translations
 * Usage: const { t } = useTranslation();
 * Example: t('nav.home') will return "Home" in English or "หน้าแรก" in Thai
 */
export function useTranslation() {
  const { locale } = useLanguage();
  
  // Get the current locale's dictionary, fallback to English
  const translations = dictionary[locale] || dictionary.en;
  
  /**
   * Get a translation by key (supports nested objects with dot notation)
   * @param {string} key - The translation key (e.g., 'nav.home')
   * @param {object} params - Optional parameters for interpolation
   * @returns {string} The translated string
   */
  const t = (key, params = {}) => {
    // Handle dot notation for nested keys
    const keys = key.split('.');
    let value = translations;
    
    // Navigate through the object
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key; // Fallback to key itself if not found
      }
    }
    
    // If the value is a string, return it
    if (typeof value === 'string') {
      // Handle parameter interpolation if needed
      return Object.entries(params).reduce(
        (str, [param, val]) => str.replace(new RegExp(`{{${param}}}`, 'g'), val),
        value
      );
    }
    
    // If the value is not a string (e.g., an object), return the key
    console.warn(`Translation key is not a string: ${key}`);
    return key;
  };
  
  return { t, locale };
} 