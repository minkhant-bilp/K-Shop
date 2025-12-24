import en from './en';
import my from './my';

type LanguageType = 'my' | 'en';

const translations = {
  en,
  my,
};

export const getTranslation = (lang: LanguageType) => {
  return translations[lang] || translations.en;
};
