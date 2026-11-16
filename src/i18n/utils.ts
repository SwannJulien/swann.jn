import { ui, defaultLang } from './ui';

export type Lang = keyof typeof ui;

export function toLang(locale: string | undefined): Lang {
  return locale && locale in ui ? (locale as Lang) : defaultLang;
}

export function getLangPaths() {
  return (Object.keys(ui) as Lang[]).map((lang) => ({
    params: { lang: lang === defaultLang ? undefined : lang },
  }));
}

export function useTranslations(locale: string | undefined) {
  const lang = toLang(locale);
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return key in ui[lang] ? (ui[lang] as any)[key] : ui[defaultLang][key];
  }
}
