import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import es from "./es.json";

export type locales = "en" | "es";

export const getI18n = () =>
  new I18n({
    en,
    es,
  });

export const getDefaultLanguage = (): locales => {
  // Obtain device language
  const deviceLanguage = getLocales()[0].languageCode;

  // If device language is not on the support language list, fallback to english
  if (!deviceLanguage || !getI18n().availableLocales.includes(deviceLanguage))
    return "en";

  // @ts-ignore
  return deviceLanguage;
};
