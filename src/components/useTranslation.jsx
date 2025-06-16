// src/components/useTranslation.js

import { useLanguage } from './Context';
import en from '../translations/en.json';
import hi from '../translations/hi.json';
import te from '../translations/te.json';

const translations = {
  en,
  hi,
  te,
};

const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return { t };
};

export default useTranslation; // ✅ CORRECT

