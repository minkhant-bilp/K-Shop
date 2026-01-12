// hook/useTranslation.ts
import useLanguageStore from '@/structure/stores/useLanguageStore';
import { getTranslation } from '@/structure/translation/i18n';
import { useMemo } from 'react';

const useTranslation = () => {
  const lang = useLanguageStore((state) => state.lang);
  const t = useMemo(() => {
    return getTranslation(lang);
  }, [lang]);

  return {t, lang};
};

export default useTranslation;
