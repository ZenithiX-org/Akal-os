'use client';

import { useOSStore } from './os-store';
import { getTranslation, type Translation, type Language } from './i18n';

export function useT(): Translation {
  const language = useOSStore((s) => s.language);
  return getTranslation(language);
}

export function useLanguage(): [Language, (l: Language) => void] {
  const language = useOSStore((s) => s.language);
  const setLanguage = useOSStore((s) => s.setLanguage);
  return [language, setLanguage];
}
